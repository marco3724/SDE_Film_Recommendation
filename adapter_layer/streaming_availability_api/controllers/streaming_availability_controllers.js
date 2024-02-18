const axios = require("axios")
exports.getStreamingAv = async (req, res) => {
  const filmID = req.query.filmID
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get',
    params: {
      output_language: 'en',
      imdb_id: filmID
    },
    headers: {
      'X-RapidAPI-Key':process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options)
    
    //standardize the data
    const availability =[]
    const keys =[]
    response.data?.result.streamingInfo.it.forEach(data=>{
      if(!keys.includes(data.service)){
        keys.push(data.service)
        availability.push( {
          service: data.service,
          streamingType:data.streamingType,
          link:data.link
        })
      }
    })
    const final_response = {
      services: availability,
      cast: response.data?.result.cast
    }
    return res.status(200).send(final_response);
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

