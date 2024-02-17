const axios = require("axios")
exports.getDetails = async (req, res) => {
  const filmID = req.query.filmID
  console.log(process.env.TMDB_AUTHORIZATION)
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filmID}`,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY0ODkyNTAwM2U3OWI3ZjhhYzFjNzlkNDkzNWNlNiIsInN1YiI6IjYyM2YzMmJiYzYxNmFjMDA0Nzc5MWM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juuccecra3Tn695-P7vijBiEMgA1PFU39cCQ1k-kYqc'
      }
  };

  try {
    const response = await axios.request(options)
    
    const data = response.data
    const detail ={
      id:data.imdb_overview,
      title: data.original_title,
      overview: data.overview,
      revenue:data.revenue,
      homepage:data.homepage,
      budget:data.budget,
      rating: data.vote_average,
      ratingCount:data.vote_count,
      adult:data.adult,
      genres:data.genres.map(x=>x.name),
    }
    return res.status(200).send(detail);
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

