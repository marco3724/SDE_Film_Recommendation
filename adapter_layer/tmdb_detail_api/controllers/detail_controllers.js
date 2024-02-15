const axios = require("axios")
exports.getDetails = async (req, res) => {
  const filmID = req.query.filmID
  console.log(process.env.TMDB_AUTHORIZATION)
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filmID}`,
    headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_AUTHORIZATION
      }
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    return res.status(200).send(response.data);
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from external API"
      }
      console.log(error)
      return res.status(500).send(response);

  }
     
}

