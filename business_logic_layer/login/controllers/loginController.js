const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// ISSUE here, what if the service below does not start on
// AUTH_ADAPTER_PORT but on 3001? then we are fuc...
const AUTH_DB_ADAPTER_ENDPOINT = `http://auth_db_adapter:${process.env.AUTH_ADAPTER_PORT}/login`;

exports.login = async (request, response) => {
    const {email, password} = request.body;
    let user;

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
            const res = await fetch(AUTH_DB_ADAPTER_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(bodyRequest),
                headers: {'Content-Type' : 'application/json'}
            });

            user = await res.json();
        } catch (error) {
            return response.status(400).send({
                message: "Oops something went wrong :("
            });
        }

        if (!user) {
            return response.status(400).send({
                message: "Oops something went wrong :(, user not found"
            });
        } else {
            const token = jwt.sign({
                userName: user.user_data.userName,
                email: user.user_data.email
            }, process.env.JWT_SECRET);
            return response.status(200).json({
                status: "success",
                message: "user found",
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
        });
    } catch (error) {
        return response.status(200).json({
            status: "success",
            isAuthenticated: false
        });
    }
};