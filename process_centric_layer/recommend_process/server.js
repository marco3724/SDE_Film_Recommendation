const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/recommend_routes')

app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use("/recommend_film", router);


const PORT = process.env.RECOMMEND_PROCESS_PORT ||8006;
//console.log(process.env.RECOMMEND_PROCESS_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});