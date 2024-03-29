const fetch = require("node-fetch");
const LOGIN_BUSINESS_ENDPOINT = `http://login_business:${process.env.LOGIN_BUSINESS_PORT}/login`;
const VERIFICATION_TOKEN_ENDPOINT = LOGIN_BUSINESS_ENDPOINT + "/verify-token";

exports.loginProcedure = async (request, response) => {
    const { email, password } = request.body;

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

    if (result.status == "success") {
        return response.cookie("token", result.jwtToken, {
            httpOnly: true,
            //sameSite: true,
        }).status(200).json({ 
            status: "success",
            message: "Successfull login"
        });
    } else {
        return response.status(400).json({
            status: "unsuccess",
            message: result.message
        });
    }
};

exports.verifyAuthentication = async (request, response) => {
    const token = request.cookies["token"];

    if (!token) {
        return response.status(200).json({
            status: "success",
            isAuthenticated: false
        });
    }

    let bodyToken = {
        tkn: token
    }

    let validation;

    try {
        const req = await fetch(VERIFICATION_TOKEN_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(bodyToken),
            headers: { 'Content-Type' : 'application/json'}
        });

        validation = await req.json();
    } catch (error) {
        return response.status(400).json({
            status: "unsuccessful",
            message: "Oops something went wrong"
        });
    }

    if (validation.status == "success") {
        return response.status(200).json({
            status: "success",
            isAuthenticated: validation.isAuthenticated,
        });
    } else {
        return response.status(200).json({
            status: "success",
            isAuthenticated: validation.isAuthenticated
        });
    }

}