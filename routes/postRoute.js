const express = require("express");
const router = express.Router();

// file import
const db = require("../data/db");

// grab all posts

router.get("/", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

// grab posts by id
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

//adding a post
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Invalid post"
    });
  }

  const newPost = {
    title: req.body.title,
    contents: req.body.contents
  };

  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

//update posts
router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Invalid post"
    });
  }

  const update = {
    title: req.body.title,
    contents: req.body.contents
  };

  db.update(req.params.id, update)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post could not be found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating post"
      });
    });
});

module.exports = router;
