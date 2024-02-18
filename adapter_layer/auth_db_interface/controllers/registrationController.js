const {randomBytes, pbkdf2Sync} = require("node:crypto");
const User = require("../models/user.js");


exports.createUser = async (request, response) => {

    const userEmail = request.body.email;
    const password = request.body.password;

    const foundExistingUser = await User.findByPk(userEmail);

    if (foundExistingUser) {
        return response.status(500).json({ 
            status: "same-email",
            message: "Found an account with the same email"
        });
    } else {

        if (!userEmail || !password) {
            return response.status(400).send({
                message: "Email and password are required!"
            });
        } else {
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
        // // validate email
        // let userEmail = request.body.email;
        // if (!userEmail) {
        //     return response.status(500).send({ message: "Email is required" });
        // }

        // const isEmailValid = emailValidator.validate(userEmail);
        // if (!isEmailValid) {
        //     return response.status(500).send({ message: "The email is not valid" });
        // }

        // // validate password
        // let userPw = request.body.password;
        // if (!userPw) {
        //     return response.status(500).send({ message: "Password is required" });
        // }

        // if (!PW_REGEX.test(userPw)) {
        //     return response.status(500).send({ message: "The password is not valid. It must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:" }); 
        // }
    }

    
};
