const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving comment" });
    });
});

router.post(":id/comments", (req, res) => {
  const { id } = req.params;
  const comment = { ...req.body, post_id: id };

  Posts.insert(comment)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id).then(post => {
    if (!post) {
      res.status(404).json({ message: "The post with that ID does not exist" });
    }
    res.status(200).json(post);
  });
  Posts.remove(req.params.id).catch(err => {
    console.log(err);
    res
      .status(500)
      .json({ message: "The post information could not be retrieved." });
  });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Posts.update(id, changes)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "The post could not be found" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post"
      });
    });
});

module.exports = router;
