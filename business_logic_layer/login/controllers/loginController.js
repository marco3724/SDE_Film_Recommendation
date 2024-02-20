const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// ISSUE here, what if the service below does not start on
// AUTH_ADAPTER_PORT but on 3001?
const AUTH_DB_ADAPTER_ENDPOINT = `http://auth_db_adapter:${process.env.AUTH_ADAPTER_PORT}/login`;

exports.login = async (request, response) => {
    const {email, password} = request.body;
    let result;

    if (!email || !password) {
        return response.status(400).send({
            message: "Email and password required!"
        });
    } else {
        const bodyRequest = {
            email: email,
            password: password
        }

        try {
            const query = await fetch(AUTH_DB_ADAPTER_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(bodyRequest),
                headers: {'Content-Type' : 'application/json'}
            });

            result = await query.json();
        } catch (error) {
            return response.status(500).json({
                status: "unsuccess",
                message: "Oops server has a problem :("
            });
        }

        if (result.status === "unsuccess") {
            return response.status(400).json({
                status: "unsuccess",
                message: "Wrong email or password"
            });
        } else {
            const token = jwt.sign({
                userName: result.user_data.userName,
                email: result.user_data.email
            }, process.env.JWT_SECRET);
            return response.status(200).json({
                status: "success",
                message: "Succesfully logged in!",
                jwtToken: token
            }); 
        }
    }
};

exports.verifyToken = async (request, response) => {
    const {tkn} = request.body;

    if (!tkn) {
        return response.status(200).json({
            status: "unsuccess",
        });
    }

    try {
        const decodedToken = jwt.verify(tkn, process.env.JWT_SECRET);
        return response.status(200).json({
            status: "success",
            isAuthenticated: true,
            plain_token: decodedToken
        });
    } catch (error) {
        return response.status(200).json({
            status: "success",
            isAuthenticated: false
        });
    }
};