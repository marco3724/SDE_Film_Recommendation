const axios = require("axios")
exports.getDetails = async (req, res) => {

  //fetching the detail from the first provider
  const filmID = req.query.filmID
  const details = []
  let port = process.env.IMDB_DETAIL_PORT || 3000;
  let options = {
    method: 'GET',
    url: `http://imdb_detail_adapter:${port}/imdb_film/detail?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    details.push(response.data)
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }

   //fetching the detail from the second  provider
  port = process.env.TMDB_DETAIL_PORT || 3001;
  options = {
    method: 'GET',
    url: `http://tmdb_detail_adapter:${port}/tmdb_film/detail?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    console.log(response.status)
    details.push(response.data)
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      }
      console.log(error)
      //return res.status(500).send(response);

  }
  //process data and merge the object
  const full_detail = details.reduce((acc, obj) => ({ ...acc, ...obj }), {})
  //merge rating from various api
  let rating = 0
  details.forEach(detail => {
    rating += detail.rating
  })
  full_detail.rating = rating / details.length

  //merge genres
  const genres = new Set()
  details.forEach(detail => {
    detail.genres.forEach(gen=>genres.add(gen))
  })
  full_detail.genres = [...genres]
  return res.status(200).send(full_detail);
     
}
