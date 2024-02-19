const axios = require("axios")
exports.getRecommendation = async (req, res) => {

  //fetching the films 
  const genre = req.query.genre
  let films = []
  let port = process.env.IMDB_DETAIL_PORT || 3000;
  let options = {
    method: 'GET',
    url: `http://imdb_detail_adapter:${port}/imdb_film/recommend_popular_film?genre=${genre}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    films = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }

  //fetching the details of the films
  films = films.map(film =>film.split("/")[2])
  const detailsPromises = films.map(async film => {
    const filmID = film;
    const options = {
      method: 'GET',
      url: `http://imdb_detail_adapter:${port}/imdb_film/detail?filmID=${filmID}`,
    };

    try {
      const response = await axios.request(options);
      response.data.id = filmID
      return response.data
    } catch (error) {
      console.error(error);
      return {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      };
    }
  });

  try {
    //wait all the request to be finished
    const details = await Promise.all(detailsPromises);
    return res.status(200).send(details);
  } catch (error) {
    // Handle the case where one of the promises fails
    return res.status(500).send({
      "status": "error",
      "code": 500,
      "message": "Error in processing requests"
    });
  }
     
}
