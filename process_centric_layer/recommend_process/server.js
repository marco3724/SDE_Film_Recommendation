const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const router = require('./routes/recommend_routes')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());
app.use("/recommend_film", router);


const PORT = process.env.RECOMMEND_PROCESS_PORT || 8006;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});