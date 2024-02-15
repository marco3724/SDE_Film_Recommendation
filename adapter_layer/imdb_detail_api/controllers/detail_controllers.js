const axios = require("axios")
exports.getDetails = async (req, res) => {
  const filmID = req.query.filmID
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {
      tconst: filmID,
      currentCountry: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY ,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    return res.status(200).send(response.data);
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

exports.getAutocomplete = async (req, res) => {
  const searchTerm = req.query.name
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: searchTerm},
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    return res.status(200).send(response.data);
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