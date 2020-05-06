const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes');

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.status(200).send("Server is up and running!");
});

server.use("/api/posts", routes);

const port = 5000;

server.listen(5000, () => {
    console.log(`\n Server running on port ${port}! \n`)
});