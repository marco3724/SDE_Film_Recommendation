const express = require('express');

const app = express();
const router = require('./routes/reviews_routes')

app.use("/imdb_film_review", router);
const PORT = process.env.IMDB_REVIEW_PORT || 3002;
console.log(process.env.IMDB_REVIEW_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});