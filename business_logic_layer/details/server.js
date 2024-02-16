const express = require('express');

const app = express();
const router = require('./routes/details_routes')

app.use("/full_details_film", router);
const PORT = process.env.TMDB_ADAPTER_PORT || 4000;
console.log(process.env.TMDB_ADAPTER_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});