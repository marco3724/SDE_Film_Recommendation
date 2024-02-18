const express = require('express');

const app = express();
const router = require('./routes/recommend_routes')

app.use("/recommend_film", router);
const PORT = process.env.RECOMMEND_PORT || 4003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});