// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  Post.find()
    .then((found) => {
      res.status(200).json(found);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(post);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(404).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});
router.delete("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.get("/:id/messages", (req, res) => {});

module.exports = router;
