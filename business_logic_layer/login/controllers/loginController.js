const fetch = require("node-fetch");

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
            return response.status(200).send({
                message: "user found"
            }); 
        }
    }
};