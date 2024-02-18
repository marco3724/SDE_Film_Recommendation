const express = require('express');

const app = express();
const router = require('./routes/streaming_availability_routes')

app.use("/streaming_availability", router);
const PORT = process.env.STREAMING_AVAILABILITY_PORT || 3005;
console.log(process.env.IMDB_REVIEW_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});