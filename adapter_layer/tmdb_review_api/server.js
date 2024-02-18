const express = require('express');

const app = express();
const router = require('./routes/reviews_routes')

app.use("/tmdb_film_review", router);
const PORT = process.env.TMDB_REVIEW_PORT || 3003;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});