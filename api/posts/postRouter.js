const express = require("express");
const Posts = require("../db-helpers");
const router = express.Router();

router.post("/", function (req, res) {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(post)
      .then((obj) => {
        res.status(201).json({ ...post, id: obj.id });
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

router.post("/:id/comments", function (req, res) {
  const comment = { text: req.body.text, post_id: req.params.id };

  if (!comment.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  } else {
    Posts.insertComment(comment)
      .then((obj) => {
        res.status(201).json({ ...comment, id: obj.id });
      })
      .catch(() => {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      });
  }
});

router.get("/", function (req, res) {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", function (req, res) {
  const id = req.params.id;

  Posts.findById(id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

router.get("/:id/comments", function (req, res) {
  const id = req.params.id;

  Posts.findPostComments(id)
    .then((comments) => {
      comments
        ? res.status(200).json(comments)
        : res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  let post;

  Posts.findById(id)
    .then((found_post) => {
      if (found_post[0]) {
        post = found_post[0];
        Posts.remove(id).then(() => res.status(200).json(post));
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", function (req, res) {
  const id = req.params.id;
  const postUpdate = req.body;
  let post;

  if (!postUpdate.title || !postUpdate.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.findById(id).then((found_post) => {
      if (found_post[0]) {
        post = found_post[0];
        Posts.update(id, postUpdate)
          .then(() => {
            res.status(200).json({...postUpdate, id: post.id});
          })
          .catch(() => {
            res
              .status(500)
              .json({ error: "The post information could not be modified" });
          });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    });
  }
});

module.exports = router;
