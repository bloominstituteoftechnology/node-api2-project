const express = require("express");

const server = express();

server.listen(8000, () => {
  console.log("Server has been intialized on port 8000...");
});
