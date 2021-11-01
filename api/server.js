// implement your server here
const express = require("express"); // this gives us our http methods

const cors = require("cors");
const helmet = require("helmet"); // adds more vunerability fixes
const morgan = require("morgan");

const server = express();

server.use(express.json()); // allows us to send JSON in the body of the req
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

const currentTime = new Date().toLocaleTimeString();

server.get("/status", (req, res) => {
  //   res.send("hello from node");
  res.status(200).json({
    status: 200,
    message: `Server is up and running at ${currentTime}`,
    author: "Github: @cbarcinas",
  });
});

// require your posts router and connect it here

module.exports = server;
