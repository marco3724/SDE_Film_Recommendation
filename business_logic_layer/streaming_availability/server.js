const express = require('express');

const app = express();
const router = require('./routes/availability_routes')

app.use("/available_streaming_services", router);
const PORT = process.env.AVAILABILITY_STREAMING_BUSINESS_PORT || 4002;
console.log(process.env.AVAILABILITY_STREAMING_BUSINESS_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});