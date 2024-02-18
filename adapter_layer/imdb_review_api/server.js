const express = require('express');

const app = express();
const router = require('./routes/reviews_routes')

//root path of this microservice
app.use("/imdb_film_review", router);
const PORT = process.env.IMDB_REVIEW_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});