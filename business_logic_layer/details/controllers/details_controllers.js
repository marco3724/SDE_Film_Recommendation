const axios = require("axios")
exports.getDetails = async (req, res) => {


  const filmID = req.query.filmID
  let detail1,detail2 = {}
  let options = {
    method: 'GET',
    url: `http://imdb_detail_adapter:3000/imdb_film/detail?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    detail1 = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }
  options = {
    method: 'GET',
    url: `http://tmdb_detail_adapter:3001/tmdb_film/detail?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    console.log(response.status)
    detail2 = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }
 
  const full_detail= {
    ...detail1,
    ...detail2
  }
  full_detail.genres = [...new Set([...detail1.genres, ...detail2.genres])]
  return res.status(200).send(full_detail);
     
}
