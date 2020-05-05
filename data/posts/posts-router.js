const express = require("express");

const Posts = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.post("", (req, res) => {
  if (
    req.body.title === undefined ||
    req.body.title === "" ||
    req.body.contents === undefined ||
    req.body.contents === ""
  ) {
    res.status(400).json({
      erorrMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error adding a post",
        });
      });
  }
});

module.exports = router;
