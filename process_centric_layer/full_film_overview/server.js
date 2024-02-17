const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/overview_routes')
app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use("/full_overview_film", router);


const PORT = process.env.FULL_OVERVIEW_PORT || 5000;
console.log(process.env.FULL_OVERVIEW_PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});