const router = require("express").Router();
const controller = require("../controllers/recommend_controllers.js")
// Get full recommendation film
router.get("/", controller.getRecommendation);
router.get("/get-history", controller.getHistory);
router.post("/save-history", controller.saveHistory);

//check the status of this microservices
router.get('/health', (req, res) => {
    let response = {
        "status": "ok",
        "code": 200,
        "message": "Detail api is up and running"
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

    