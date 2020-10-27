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
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

postRouter.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

//--------------------------POST----------------------------------------------//

// postRouter("/api/posts", (req, res) => {
//   const newPost = { id: req.params.id, ...req.body }
//   posts.insert(newPost)
//   .then(data => {
//     res.status(201).json(data)
//   })
//   .catch(error => {
//     console.log(error.message, error.stack)
//     res.status(500).json({
//       message: error.message,
//       stack: error.stack,
//     })
//   })
// })

// postRouter("/api/posts/:id/comments", (req, res) =>{
//   const newComment = { id: req.params.id, ...req.body }
//   posts.insertComment(newComment)
//   .then(data => {
//     res.status(201).json(data)
//   })

// })

//--------------------------DELETE----------------------------------------------//

//--------------------------PUT----------------------------------------------//

module.exports = postRouter;
