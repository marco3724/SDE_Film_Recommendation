const express = require('express');

const app = express();
const router = require('./routes/reviews_routes')

app.use("/full_review_film", router);
const PORT = process.env.FULL_REVIEW_PORT || 4001;
console.log(process.env.FULL_REVIEW_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});