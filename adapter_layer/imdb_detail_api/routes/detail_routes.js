const router = require("express").Router();
const controller = require("../controllers/detail_controllers.js")

// Gets information of a film from the imdb api
router.get("/detail", controller.getDetails);

// Gets the suggestion with the film that matches the search term
router.get("/autocomplete", controller.getAutocomplete);

//Gets the suggestion with the film that matches the genres
router.get("/recommend_popular_film", controller.getPopularFilmByGenres);

//check the status of this microservices
router.get('/health', (req, res) => {
    let response = {
        "status": "ok",
        "code": 200,
        "message": "imdb detail api is up and running"
      }
      res.status(200).send(response);
  });

  
// handle other method except get
router.all("/", function(req, res, next) {
  let response = {
    "status": "error",
    "code": 405,
    "message": "The requested method is not allowed for the URL."
  }
  res.status(405).send(response);
});

module.exports = router

    