const express = require("express");

const server = express();

server.use(express.json());
//MIDDLEWARE
// const morgan = require("morgan");
///import logger middleware here
const deny = require("./middleware/deny");
const logger = require("./middleware/logger");

const welcomeRouter = require("./welcomeRouter/welcome-router");
const postsRouter = require("./postsRouter/posts-routers");

// server.use(morgan("combined"));
server.use(deny("insomnia"));
server.use(logger("long"));

// WELCOME ROUTER
server.use("/", welcomeRouter);

//CRUD /api/posts
server.use("/api/posts", postsRouter);

///MIDDLEWARE FOR CATCH errors, when adding 4 parementers it knows
//its handling an error from CATCH
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong, please try again later",
  });
});

server.listen(8000, () => {
  console.log("****Server is listening on PORT: ", 8000);
});
