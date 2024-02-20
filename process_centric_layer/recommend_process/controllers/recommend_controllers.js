const axios = require("axios")

exports.getDetails = async (req, res) => {

  //prepare the request for the first service
  let details = []
  const genre = req.query.genre
  const token = req.cookies["token"]
  let port = process.env.RECOMMEND_PORT || 4003;
  let options = {
    method: 'GET',
    url: `http://recommend_business:${port}/recommend_film?genre=${genre}`,
  };

  try {
    const response = await axios.request(options);
    details = response.data
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from tmdb adapter layer"
      }
      console.log(error)
      return res.status(500).send(response);

  }

  // Automatically save the recommended films
  if(token){  
  try {
      let saveStatus = await saveRecommendedFilms(details, token);
      return res.status(200).send(details);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Error saving recommended films"
      });
    }
  } 
return res.status(200).send(details);
     
}

exports.getHistory = async (request, response) => {
  const token = request.cookies["token"];
  
  if (!token) {
    return response.status(400).json({
      status: "unsuccess",
      message: "You need to login in order to see you history"
    });
  } else {
    let queryOptions = {
      method: "GET",
      url: `http://recommend_business:${process.env.RECOMMEND_PORT}/recommend_film/get-history`,
      params: {
        tkn: token
      }
    };

    const req = await axios.request(queryOptions);
    let res = req.data;
    return response.status(200).json({
      message: "correct",
      films: res.films
    });
  }
};

// Utility function to save recommended films
async function saveRecommendedFilms(listOfFilms, token) {
  const url = `http://recommend_business:${process.env.RECOMMEND_PORT}/recommend_film/save-history`;

  try {
    const query = await axios.post(url, {
      films: listOfFilms,
      tkn: token
    });
    return query.data;
  } catch (error) {
    throw new Error('This is an error message');
  }
};