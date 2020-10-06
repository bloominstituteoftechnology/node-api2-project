const express = require("express");
const posts = require("../data/db");

const router = express.Router();

// Returns an array of all the post objects contained in the database.
router.get("/api/posts", (req, res) => {
  posts
    .find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving posts",
      });
    });
});

// Returns the post object with the specified id.
router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post.length > 0) {
        res.json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

// Creates a post using the information sent inside the request body.

router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Missing title or contents.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "There was an error while saving the post to the database.",
      });
    });
});

// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/api/posts/:id", async (req, res) => {
  const postToDelete = await posts.findById(req.params.id);

  if (postToDelete.length > 0) {
    posts
      .remove(req.params.id)
      .then(
        res.status(200).json({
          message: "The post has been removed.",
        })
      )
      .catch((error) => {
        res.status(500).json({
          error: "The post could not be removed.",
        });
      });
  } else {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  }
});

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/api/posts/:id/comments", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {})
    .catch((error) => {
      return res.status(400).json({
        message: "The post with the specified ID does not exist.",
      });
    });

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error saving post.",
      });
    });
});

// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.

// PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

module.exports = router;
