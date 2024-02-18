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
      'X-RapidAPI-Key':'39bbed41d0msh4f8fb277bd4cc7fp153229jsnc7926dfe9091',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options)
    console.log(response.data)
    const availability =response.data?.result.streamingInfo.it.map(data=>{
      return {
        service: data.service,
        streamingType:data.streamingType,
        link:data.link
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

