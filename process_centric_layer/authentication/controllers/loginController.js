const fetch = require("node-fetch");
const LOGIN_BUSINESS_ENDPOINT = `http://login_business:${process.env.LOGIN_BUSINESS_PORT}/login`;

exports.loginProcedure = async (request, response) => {
    const { email, password } = request.body;

    // check if email and password are there
    if (!email || !password) {
        return response.status(400).send({
            message: "Email and password are required!"
        });
    }

    let userData = {
        email: email,
        password: password
    };

    let result;

    try {
        const req = await fetch(LOGIN_BUSINESS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type' : 'application/json'}
        });

        result = await req.json();
    } catch (error) {
        return response.status(400).send({
            message: "Oops something went wrong"
        });
    }

    if (result) {
        console.log(result);
        return response.status(200).send({
            message: "Login successful"
        });
    } else {
        console.log(result);
        return response.status(400).send({
            message: "Oops something went wrong :(, during the login"
        });
    }
};