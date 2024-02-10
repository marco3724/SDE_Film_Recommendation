const express = require('express');
const PORT = process.env.AUTH_DB_ADAPTER || 3000;

const server = express();



server.listen(PORT, () => {
    console.log(`Authentication DB Adapter Server is running on port ${PORT}`);
})