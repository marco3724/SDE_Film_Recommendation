const router = require("express").Router();
const controller = require("../controllers/streaming_availability_controllers.js")
// Gets streaming availability about a given film
router.get("/", controller.getStreamingAv);

//check the status of this microservices
router.get('/health', (req, res) => {
    let response = {
        "status": "ok",
        "code": 200,
        "message": "streaming availability api is up and running"
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

    