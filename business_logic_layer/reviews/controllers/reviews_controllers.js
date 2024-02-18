const axios = require("axios")
exports.getDetails = async (req, res) => {


  const filmID = req.query.filmID
  const reviews = []
  let port = process.env.IMDB_REVIEW_PORT || 3002;
  let options = {
    method: 'GET',
    url: `http://imdb_review_adapter:${port}/imdb_film_review?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    reviews.push(...response.data)
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }
  port = process.env.TMDB_REVIEW_PORT || 3003;
  options = {
    method: 'GET',
    url: `http://tmdb_review_adapter:${port}/tmdb_film_review?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.status)
    reviews.push(response.data)
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }
 
  return res.status(200).send(reviews);
     
}
