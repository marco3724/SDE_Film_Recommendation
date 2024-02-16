const express = require('express');

const app = express();
const router = require('./routes/detail_routes')

app.use("/tmdb_film", router);
const PORT = process.env.TMDB_DETAIL_PORT || 3001;
console.log(process.env.TMDB_DETAIL_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});