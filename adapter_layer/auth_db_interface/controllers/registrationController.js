const {randomBytes, pbkdf2Sync} = require("node:crypto");
const emailValidator = require("email-validator");
const User = require("../models/user.js");
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


exports.createUser = async (request, response) => {

    const foundExistingUser = await User.findByPk(request.body.email);

    if (foundExistingUser) {
        response.status(500).send({ message: "Found an account with the same email"});
    } else {

        // validate email
        let userEmail = request.body.email;
        if (!userEmail) {
            return response.status(500).send({ message: "Email is required" });
        }

        const isEmailValid = emailValidator.validate(userEmail);
        if (!isEmailValid) {
            return response.status(500).send({ message: "The email is not valid" });
        }

        // validate password
        let userPw = request.body.password;
        if (!userPw) {
            return response.status(500).send({ message: "Password is required" });
        }

        if (!PW_REGEX.test(userPw)) {
            return response.status(500).send({ message: "The password is not valid. It must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:" }); 
        }

        const salt = randomBytes(16).toString('hex');
        // consider switching to sha-256 also modyfing the user model
        const hashedPassword = pbkdf2Sync(request.body.password, salt, 10000, 512, 'sha512').toString('hex');

        const newUser = new User({
            userName: request.body.userName,
            email: userEmail,
            password: hashedPassword,
            salt: salt
        });
    
        try {
            const savedUser = await newUser.save();
            response.status(200).send({message: 'good'});
        } catch (error) {
            console.error("Error while creating new user: ", error);
            response.status(500).send({message: 'bad'});
        }
    }

    
};
