const film = require("../models/savedFilm.js");

exports.saveFilm = async (request, response) => {

    const findUser = await film.find({ userEmail: request.body.email }).exec();
    
    if (!findUser.length == 0) {

        const res = await film.updateOne(
             { userEmail: request.body.email}, 
             { $push: { films: { $each: request.body.films }}}
        );
        console.log(res);
        return response.status(200).send({ message: "found"});
    } else {
        const newFilm = new film({
            userEmail: request.body.email,
            films: request.body.films
        });

        try {
            const insertResponse = await newFilm.save();
            return response.status(200).json({
                status: "success",
                message:"Film saved succesfully"
            });
        } catch (error) {
            return response.status(500).json({
                status: "unsuccess",
                message: "Something went wrong"
            });
        }
    }

    
};