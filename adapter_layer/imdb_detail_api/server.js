
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/detail_routes')
app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use("/imdb_film", router);
const PORT = process.env.IMDB_DETAIL_PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});