const savedFilmsModel = require("../models/savedFilm.js");

exports.findAllSavedFilms = async (request, response) => {
    const email = request.query.email;

    const user = await savedFilmsModel.find({ userEmail: email });

    if (!user.length == 0) {
        let films = user[0].films;

        return response.status(200).json({
            status: "success",
            message: "user found",
            savedFilms: films
        });
    } else {
        return response.status(400).json({
            status: "success",
            message: "user not found"
        });
    }
}