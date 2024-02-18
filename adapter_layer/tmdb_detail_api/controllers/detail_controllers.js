const axios = require("axios")
exports.getDetails = async (req, res) => {
  const filmID = req.query.filmID
  //prepare the request
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${filmID}`,
    headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_AUTHORIZATION
      }
  };

  try {
    const response = await axios.request(options)
    
    //standardize the data
    const data = response.data
    const detail ={
      id:data.imdb_overview,
      title: data.original_title,
      overview: data.overview,
      revenue:data.revenue,
      homepage:data.homepage,
      productionCompanies: data.production_companies.map(x=>x.name),
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

