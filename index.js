const express = require("express");

const server = express();

const expressRouter = require("./routes/expressRouter.js")

const port = process.PORT || 8500;

server.get("/", (req, res) => {
    res.send("Server Running!");
});

server.use("/api/posts", expressRouter);

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });