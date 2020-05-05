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

router.get("/:id/", (req, res) => {
  Posts.findById(req.params.id)
    .then((article) => {
      if (article.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(article);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});
router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// router.get("/:id/comments", (req, res) => {
//   Posts.findById(id);
// });

module.exports = router;
