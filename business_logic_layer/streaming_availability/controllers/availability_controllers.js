const axios = require("axios")
exports.getDetails = async (req, res) => {

 let availability = {}
  const filmID = req.query.filmID
  if(!filmID) 
    return res.status(400).send({ 
      "status": "error",
      "code": 400,
      "message": "filmID is required"
    });
  //fetching the detail from the first provider
  let port = process.env.STREAMING_AVAILABILITY_PORT || 3005;
  let options = {
    method: 'GET',
    url: `http://streaming_availability_adapter:${port}/streaming_availability?filmID=${filmID}`,
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    availability = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from imdb adapter layer"
      }
      console.log(error)

  }
  

  return res.status(200).send(availability);
     
}
