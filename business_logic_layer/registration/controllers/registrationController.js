const fetch = require("node-fetch");
const emailValidator = require("email-validator");
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const AUTH_DB_ADAPTER_ENDPOINT = `http://auth_db_adapter:${process.env.AUTH_ADAPTER_PORT}/register`;

exports.register = async (request, response) => {
    const { userName, email, password } = request.body;

    if (!userName || !email || !password) {
        return response.status(400).send({
            message: "Username, email and password are required!"
        });
    }

    // email and password validation
    const isEmailValid = emailValidator.validate(email);
    const isPasswordValid = PW_REGEX.test(password);

    if (!isEmailValid || !isPasswordValid) {
        return response.status(500).send({
            message: "Email or password not valid!"
        });
    } else {
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
    }
};