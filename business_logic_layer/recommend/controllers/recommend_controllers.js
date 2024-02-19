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

exports.getHistory = async (request, response) => {
  const url = `http://login_business:${process.env.LOGIN_BUSINESS_PORT}/login/verify-token`;
  const token = request.query.tkn;
  
  // verify token
  const query = await axios.post(url, {
    tkn: token
  });
  let result = query.data;
  if (result.status === "success" && result.isAuthenticated) {
    // if the toke is valid and the user is authenticated, proceed querying the adapter
    let userEmail = result.plain_token.email;
    let adapter_url = `http://saved_film_adapter:${process.env.USER_ADAPTER_PORT}/retrieve-film?email=${userEmail}`;
    const getHistoryQuery = await axios.get(adapter_url);
    let retrievedFilms = getHistoryQuery.data;

    return response.status(200).json({
      status: "success",
      message: "retrieve films",
      films: retrievedFilms.savedFilms
    });
  } else {
    return response.status(400).json({
      status: "unsuccess",
      message: "invalid token"
    });
  }


};
