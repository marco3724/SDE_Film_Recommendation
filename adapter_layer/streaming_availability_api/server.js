const express = require('express');

const app = express();
const router = require('./routes/streaming_availability_routes')
//root path of this microservice
app.use("/streaming_availability", router);
const PORT = process.env.STREAMING_AVAILABILITY_PORT || 3005;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});