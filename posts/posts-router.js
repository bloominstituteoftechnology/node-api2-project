const express = require("express");
const Posts = require("../data/db");
const { restart } = require("nodemon");
const router = express.Router();

//POST - API/POSTS
//IF NO TITLE or CONTENTS THROW 404
//ELSE POST USING INSERT
router.post("/", (req, res) => {
  const newPost = req.body;

  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(newPost)
      .then((postData) => {
        Posts.findById(postData.id).then((added) => {
          res.status(201).json(added);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

//POST - API/POSTS/:id/COMMENTS
//IF ID NOT FOUND THROW 404
//IF TEXT IS MISSING THROW 400
//IF VALID 201
router.post("/:id/comments", (req, res) => {
  const newComment = req.body;

  try {
    if (!newComment.text) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      newComment.post_id = req.params.id;
      Posts.insertComment(newComment)
        .then((comment) => {
          Posts.findCommentById(comment.id).then((added) => {
            res.status(201).json(added);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).send("Hello from the GET/ posts endpoint");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).send(`Hello from the GET/ posts /${id} endpoint`);
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  res.status(200).send(`hello from the GET /${id} /comments`);
});

router.delete("/:id", (req, res) => {
  res.status(204);
});

router.put("/:id", (req, res) => {
  res.status(200).send(`hello from the PUT /posts /${id} `);
});

module.exports = router;
