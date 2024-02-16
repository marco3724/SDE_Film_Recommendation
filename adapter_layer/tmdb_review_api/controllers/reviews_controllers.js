const axios = require("axios")
exports.getReviews = async (req, res) => {
  const filmID = req.query.filmID
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filmID}/reviews?language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_AUTHORIZATION
    }
  };

  try {
    const response = await axios.request(options)
    
    const results = response.data.results
    const reviews = results.map(data=>{
      return {
        author: data.author,
        content: data.content,
        time: data.created_at,
        rating: data.author_details.rating
      }
    })
 
    return res.status(200).send(reviews);
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

