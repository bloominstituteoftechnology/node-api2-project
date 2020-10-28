const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.get("/api/posts", (req, res) => {
  try {
    db.find(req.query).then((posts) => {
      res.status(200).json(posts);
    });
  } catch (err) {
    res.status(500).json({
      error: "The posts information could not be retrieved.",
    });
  }
});

router.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.findById(id).then((post) => {
      if (!post.length) {
        res.status(400).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post[0]);
      }
    });
  } catch (err) {
    res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

router.get("/api/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  try {
    db.findCommentById(id).then((post) => {
      if (!post.length) {
        res.status(400).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    });
  } catch (err) {
    res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

router.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    db.insert(req.body)
      .then((postId) => {
        const post = req.body;
        post.id = postId.id;
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.post("/api/posts/:id/comments", (req, res) => {
  const comment = { post_id: req.params.id, ...req.body };

  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    try {
      db.insertComment(comment)
        .then((post) => {
          res.status(201).json(comment);
        })
        .catch((err) => {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    }
  }
});

router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  try {
    db.remove(id)
      .then((post) => {
        res.status(200).json({
          message: "The post is deleted.",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      });
  } catch (err) {
    res.status(500).json({
      error: "The post could not be removed",
    });
  }
});

router.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    try {
      db.update(id, req.body)
        .then((post) => {
          res.status(200).json("The post is updated.");
        })
        .catch((err) => {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        });
    } catch (err) {
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    }
  }
});

module.exports = router;
