const express = require("express");
const posts = require("./posts-model");

// stand alone router
const router = express.Router();

// POST /api/posts
router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide title and contents for the post.",
    });
  }
  posts
    .insert(req.body)
    .then((post) => {
      posts.findById(post.id).then((post) => {
        res.status(201).json(post);
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database.",
      });
    });
});

// POST /posts/:id/comments
router.post("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = { post_id: id, ...req.body };

  posts
    .insertComment(comment)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json(err, {
        message: "There was an error while saving the comment to the database.",
      });
    });
});

// GET /api/posts
router.get("/posts", (req, res) => {
  posts
    .find({
      sortBy: req.query.sortBy,
      limit: req.query.limit,
    })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "The posts information could not be retrieved.",
      });
    });
});

// GET /posts/:id
router.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  posts
    .findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved.",
      });
    });
});

// GET /api/posts/:id/comments
router.get("/api/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  posts
    .findCommentById(id)
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The comments information could not be retrieved.",
      });
    });
});

// DELETE /api/posts/:id
router.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  posts
    .remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        if (!post) {
          return res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "The post could not be removed.",
      });
    });
});

// PUT /api/posts/:id
router.put("/api/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide a title and contents for the post.",
    });
  }
  posts
    .update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "The post information could not be modified",
      });
    });
});

module.exports = router;
