const express = require("express");
const router = express.Router();

const Comments = require("../data/db");
const { route } = require("../welcomeRouter/welcome-router");

//api/coments
router.get("/", (req, res, next) => {
  Comments.getComments()
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
