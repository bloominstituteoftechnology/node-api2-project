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

// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/api/posts/:id", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Missing title or contents.",
    });
  }

  const postToEdit = await posts.findById(req.params.id);

  if (postToEdit.length > 0) {
    posts
      .update(req.params.id, req.body)
      .then((post) => {
        res.status(201).json([
          {
            id: req.params.id,
            title: req.body.title,
            contents: req.body.contents,
          },
        ]);
      })
      .catch((error) => {
        res.status(500).json({
          error: "The post information could not be modified.",
        });
      });
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

// Removes the post with the specified id and returns the deleted post object.
router.delete("/api/posts/:id", async (req, res) => {
  const postToDelete = await posts.findById(req.params.id);

  if (postToDelete.length > 0) {
    posts
      .remove(req.params.id)
      .then(res.status(200).json(postToDelete))
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
router.post("/api/posts/:id/comments", async (req, res) => {
  if (!req.body.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
  console.log(req.body);
  // try {
  //   const postToAddComment = await posts.findById(req.params.id);

  //   if (postToAddComment.length > 0) {
  //     posts
  //       .insertComment(req.body)
  //       .then((comment) => {
  //         res.status(201).json(comment);
  //       })
  //       .catch((error) => {
  //         res.status(500).json({
  //           message: "Error saving comment.",
  //         });
  //       });
  //   }
  // } catch {
  //   res.status(500).json({
  //     error: "There was an error while saving the comment to the database.",
  //   });
  // }
  posts
    .insertComment({
      text: req.body.text,
      post_id: req.params.id,
    })
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error saving comment.",
      });
    });
});

// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.

router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((comments) => {
      if (comments.length > 0) {
        res.json(comments);
      } else {
        res.status(400).json({
          message: "This post either does not exist, or has no comments.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

module.exports = router;
