const axios = require("axios")
exports.getDetails = async (req, res) => {

  //prepare the request for the first service
  let details = []
  const genre = req.query.genre
  let port = process.env.RECOMMEND_PORT || 4003;
  let options = {
    method: 'GET',
    url: `http://recommend_business:${port}/recommend_film?genre=${genre}`,
  };

  try {
    const response = await axios.request(options);
    console.log(response.status)
    details = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }

  return res.status(200).send(details);
     
}
