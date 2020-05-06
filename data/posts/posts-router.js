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
    // const body = req.body;
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
  Posts.findPostComments(req.params.id)
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

router.post("/:id/comments", (req, res) => {
  if (req.body.text === null || req.body.text === "") {
    res.status(400).json({
      erorrMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.findById(req.params.id)
      .then((article) => {
        if (article.length === 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          const commentText = req.body;
          commentText.post_id = req.params.id;

          Posts.insertComment(req.body)
            .then((article) => {
              if (article === 0) {
                res.status(400).json({
                  errorMessage: "Please provide text for the comment.",
                });
              } else {
                res.status(201).json(commentText);
              }
            })
            .catch((err) => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database",
              });
            });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The post information could not be retrieved." });
      });
  }
});

router.put("/:id/comments", (req, res) => {
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
    Posts.update(req.params.id, req.body)
      .then((post) => {
        if (post === 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(post);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error adding a post",
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((removed) => {
      if (removed === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(removed);
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error occured, server is down.",
      });
    });
});

module.exports = router;
