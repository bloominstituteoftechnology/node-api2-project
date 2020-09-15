const express = require("express");
const postsRoutes = require("./routes/postRoutes");

const server = express();
const port = 8080;
server.use(express.json());

server.use("/api/posts", postsRoutes);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

server.listen(port, () => {
  console.log(`API is listining on port${port}`);
});
