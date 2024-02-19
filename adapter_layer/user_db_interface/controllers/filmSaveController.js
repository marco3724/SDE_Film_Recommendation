const film = require("../models/savedFilm.js");

exports.saveFilm = async (request, response) => {

    const findUser = await film.find({ userEmail: request.body.email }).exec();
    
    if (!findUser.length == 0) {

        const res = await film.updateOne(
             { userEmail: request.body.email}, 
             { $push: {
                films: {
                    id: request.body.film.id,
                    year: request.body.film.year,
                    title: request.body.film.title,
                    rating: request.body.film.rating 
                }
            }}
        );
        console.log(res);
        return response.status(200).send({ message: "found"});
    } else {
        const newFilm = new film({
            userEmail: request.body.email,
            films: [{
                id: request.body.film.id,
                year: request.body.film.year,
                title: request.body.film.title,
                rating: request.body.film.rating 
            }]
        });

        try {
            const insertResponse = await newFilm.save();
            return response.status(200).send({message:"Film saved succesfully"});
        } catch (error) {
            return response.status(500).send({ message: "Something went wrong"});
        }
    }

    
};