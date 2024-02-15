const fetch = require("node-fetch");
const REGISTRATION_BUSINESS_ENDPOINT = `http://registration_business:${process.env.REGISTRATION_BUSINESS_PORT}/register`

exports.register = async (request, response) => {
    const { userName, email, password } = request.body;

    if (!userName || !email || !password) {
        return response.status(400).send({
            message: "All field required"
        });
    }

    let userData = {
        userName: userName,
        email: email,
        password: password
    };

    try {
        let res = await fetch(REGISTRATION_BUSINESS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type' : 'application/json'}
        });

        let result = await res.json();

        if (result) {
            return response.status(200).send({
                message: "registration succesfull"
            });    
        } else {
            return response.status(500).send({
                message: "oops"
            });
        }
    } catch (error) {
        return response.status(400).json({
            msg: error.toString()
        });
    }


};