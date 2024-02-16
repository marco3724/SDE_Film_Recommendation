const axios = require("axios")
exports.getReviews = async (req, res) => {
  const filmID = req.query.filmID
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-user-reviews',
    params: {
      tconst: filmID
    },
    headers: {
      'X-RapidAPI-Key': '39bbed41d0msh4f8fb277bd4cc7fp153229jsnc7926dfe9091',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options)
    const reviews =response.data?.reviews.map(rev=>{
      return {
        author: rev.author.displayName,
        content: rev.reviewText,
        time: rev.submissionDate,
        rating: rev.authorRating
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

