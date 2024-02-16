
const express = require('express');

const app = express();
const router = require('./routes/detail_routes')

app.use("/imdb_film", router);
const PORT = process.env.IMDB_DETAIL_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});