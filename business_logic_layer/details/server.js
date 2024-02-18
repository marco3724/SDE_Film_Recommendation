const express = require('express');

const app = express();
const router = require('./routes/details_routes')

app.use("/full_details_film", router);
const PORT = process.env.FULL_DETAIL_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});