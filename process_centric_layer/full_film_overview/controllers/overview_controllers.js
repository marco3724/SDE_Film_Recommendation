const axios = require("axios")
exports.getDetails = async (req, res) => {


  const filmID = req.query.filmID
  let port = process.env.FULL_REVIEW_PORT || 4001;
  let options = {
    method: 'GET',
    url: `http://full_review_business:${port}/full_review_film?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    review = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }
  port = process.env.FULL_DETAIL_PORT || 4000;
  options = {
    method: 'GET',
    url: `http://full_detail_business:${port}/full_details_film?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    console.log(response.status)
    detail = response.data
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
    ...detail,
    ...review
  }
  return res.status(200).send(full_detail);
     
}
