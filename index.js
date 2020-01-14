const express = require("express");
const server = express();
const postRouter= require("./routes/postRoute")

server.use(express.json());


//middleware
server.use("/api/posts", postRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});