const fetch = require("node-fetch");

const AUTH_DB_ADAPTER_ENDPOINT = `http://auth_db_adapter:${process.env.AUTH_ADAPTER_PORT}/register`;

exports.register = async (request, response) => {
    const { userName, email, password } = request.body;

    if (!userName || !email || !password) {
        return response.status(400).send({
            message: "Username, email and password are required!"
        });
    }

    let userData = {
        userName: userName,
        email: email,
        password: password
    };

    let result;
    try {
        const res = await fetch(AUTH_DB_ADAPTER_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'Content-Type' : 'application/json'}
        });

        result = await res.json();

    } catch (error) {
        return response.status(400).send({
            message: "Oops something went wrong :("
        });
    }

    if (result) {
        return response.status(200).send({
            message: "Registration confirmed"
        });
    } else {
        return response.status(400).send({
            message: "Oops something went wrong :(, during the registration"
        });
    }
};