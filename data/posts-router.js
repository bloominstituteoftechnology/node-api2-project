const express = require("express");
const postRouter = express.Router();

const posts = require("./db");

//--------------------------GETS----------------------------------------------//
postRouter.get("/api/posts", (req, res) => {
  posts
    .find(req.query)
    .then((db) => {
      res.status(200).json(db);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

postRouter.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      console.log(post.title);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
        error: error.message,
      });
    });
});

postRouter.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    });
});

//--------------------------POST----------------------------------------------//

postRouter.post("/api/posts", (req, res) => {
  const newPost = { id: req.params.id, ...req.body };
  posts
    .insert(newPost)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

postRouter.post("/api/posts/:id/comments", (req, res) => {
  const newComment = { post_id: req.params.id, ...req.body };
  posts
    .insertComment(newComment)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

//--------------------------DELETE----------------------------------------------//

postRouter.delete("/api/posts/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "the post has been removed" });
      } else {
        res.status(404).json({ message: "the post cannot be found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

postRouter.delete("/api/posts/:id");
  posts


//--------------------------PUT---------------------------------------//

module.exports = postRouter;
