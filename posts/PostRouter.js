const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

// Route Handlers

// POST request to /api/posts
router.post("/", (request, response) => {
  const postInfo = request.body;
  if (!postInfo.title || !postInfo.contents) {
    response.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(postInfo)
      .then(post => {
        response.status(201).json(post);
      })
      .catch(error => {
        console.log("Error: ", error);
        response.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

// POST request to /api/posts/:id/comments
router.post("/:id/comments", (request, response) => {
  const { id } = request.params;
  const commentInfo = { ...request.body, post_id: id };

  if (!id) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (!request.body.text) {
    response
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Posts.insertComment(commentInfo)
      .then(comment => {
        response.status(201).json(comment);
      })
      .catch(error => {
        console.log("Error: ", error);
        response.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

//GET request to /api/posts
router.get("/", (request, response) => {
  Posts.find(request.query)
    .then(posts => {
      response.status(200).json(posts);
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET request to /api/posts/:id
router.get("/:id", (request, response) => {
  Posts.findById(request.params.id)
    .then(post => {
      if (post) {
        response.status(200).json(post);
      } else {
        response
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({
        message: "The post information could not be retrieved."
      });
    });
});

// GET request to /api/posts/:id/comments
router.get("/:id/comments", (request, response) => {
  const postId = request.params.id;
  Posts.findPostComments(postId)
    .then(post => {
      if (post.length === 0) {
        response.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        response.status(200).json(post);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// DELETE request to /api/posts/:id
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Posts.remove(id)
    .then(post => {
      if (!post) {
        response.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        response.status(200).json(post);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ errorMessage: "The post could not be removed" });
    });
});

// PUT request to /api/posts/:id
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const updates = request.body;
  Posts.update(id, updates)
    .then(post => {
      if (!post) {
        response
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!updates.title || !updates.contents) {
        response.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        response.status(200).json(post);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;