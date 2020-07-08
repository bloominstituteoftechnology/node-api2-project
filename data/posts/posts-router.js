const express = require("express");

const router = express.Router();

const Posts = require("../db");

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Post Error");
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((article) => {
      if (article.length === 0) {
        res.status(404).json("Post error");
      } else {
        res.status(200).json(article);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Another post error!!!");
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((article) => {
      if (article.length === 0) {
        res.status(404).json("This post is non existent");
      } else {
        res.status(200).json(article);
      }
    })
    .catch((err) => {
      res.status(500).json("Post not retrieved");
    });
});

router.post("/", (req, res) => {
  if (req.body.title === "" || req.body.contents === "") {
    res.status(400).json("Information not provided");
  } else {
    Posts.insert(req.body)
      .then((post) => {
        Posts.findById(post.id).then((newPost) => {
          res.status(201).json(newPost);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Post error");
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const com = req.body;
  com.post_id = req.params.id;

  if (req.body.text === "") {
    res.status(400).json("There has been another error");
  } else {
    Posts.findCommentById(req.params.id)
      .then((article) => {
        if (article.length === 0) {
          res.status(404).json("This post is not here");
        } else {
          Posts.insertComment(req.body)
            .then((article) => {
              if (article === 0) {
                res.status(400).json("Content need to be provided");
              } else {
                res.status(201).json(commentText);
              }
            })
            .catch((err) => {
              res.status(500).json("Mas errors");
            });
        }
      })
      .catch((err) => {
        res.status(500).json("Info not retrieved");
      });
  }
});

router.put("/:id/comments", (req, res) => {
  if (req.body.title === "" || req.body.contents === "") {
    res.status(400).json("No title or contents");
  } else {
    Posts.update(req.params.id, req.body)
      .then((post) => {
        if (post === 0) {
          res.status(404).json("This post does not exist.");
        } else {
          res.status(200).json(post);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("post not added");
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
      res.status(500).json("Error occured, server is down.");
    });
});

module.exports = router;
