const film = require("../models/savedFilm.js");

exports.saveFilm = async (request, response) => {
    const {email, films} = request.body;

    const findUser = await film.find({ userEmail: email }).exec();
    
    if (!findUser.length == 0) {
        let aux_film = [];

        for (let i = 0; i < films.length; i++) {
            if (!findUser[0].films.some(film => film.id == films[i].id)) {
                aux_film.push(films[i]);
            }
        }
        
        const res = await film.updateOne(
             { userEmail: email}, 
             { $push: { films: { $each: aux_film }}}
        );
        return response.status(200).json({ 
            status: "success",
            message: "New films added"
        });
    } else {
        const newFilm = new film({
            userEmail: email,
            films: films
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