const express = require("express");

const server = express();

const expressRouter = require("./routes/expressRouter.js")

server.get("/", (req, res) => {
    res.send("Server Running!");
});

server.use("/api/blog", expressRouter)

server.listen(7000, () => console.log("API running"));