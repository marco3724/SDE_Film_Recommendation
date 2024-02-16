const User = require("../models/user.js");
const { pbkdf2Sync } = require("node:crypto");

exports.login = async (request, response) => {
    // Suppose our users login with email and password
    const foundExistingUser = await User.findByPk(request.body.email);

    if (!foundExistingUser) {
        return response.status(500).send({ message: "No such email"});
    } else {
        // validate provided credential
        let providedPassword = request.body.password;

        const storedSalt = foundExistingUser.salt;

        const providedHashedPassword = pbkdf2Sync(providedPassword, storedSalt, 10000, 512, 'sha512').toString('hex');

        // probably not good
        if (providedHashedPassword === foundExistingUser.password) {
            return response.status(200).json({ 
                message: "Succesfully logged in",
                user_data: {
                    userName: foundExistingUser.userName,
                    email: foundExistingUser.email
                }
            });
        } else {
            return response.status(500).send({ message: "Wrong email or password"});
        }
    }
};