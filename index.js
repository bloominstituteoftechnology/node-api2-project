// Server Setup
const express = require("express")
const server = express();
server.use(express.json());

// Import Routers
const postRouter = require("./posts/postRoutes");

// Apply Routers
server.use("/api/posts", postRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.json({ message: "Server running!" });
});

// Server Listener
const port = 8000;
server.listen(port, () =>
  console.log(` == Server running at http://localhost:${port} ==`)
);
