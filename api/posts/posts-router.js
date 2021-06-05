const express = require("express");

const router = express.Router();
const Posts = require("./posts-model");
console.log("Posts model => ", Posts);

// ENDPOINTS
// [GET] /api/data/:id (R of CRUD, fetch data by :id) 200s
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  Posts.findById(userId)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log("error message", err);
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});
// [GET] /api/data (R of CRUD, fetch all data) 200s
router.get("/", (req, res) => {
  Posts.find(req.query) // { limit: 7 }
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

// [POST] /api/data (C of CRUD, create new data from JSON payload)
router.post("/", (req, res) => {
  //sanity checker
  const newPost = req.body; //test passes 400 out proper key value
  Posts.insert(newPost);
  if (!newPost.title || !newPost.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert(newPost)
      .then((post) => {
        if (post) {
          Posts.findById(post.id).then((post) => {
            res.status(201).json(post);
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          error: err.message,
        });
      });
  }
});

// [PUT] /api/data/:id (U of CRUD, update data with :id using JSON payload)
router.put("/:id", (req, res) => {
  const id = req.params.id; //happy path 200
  const changes = req.body;
  if (!changes.title || !changes.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Posts.update(id, changes)
      .then((post) => {
        if (post) {
          return Posts.findById(id);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        }
      })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "The post information could not be modified",
        });
      });
  }
});

// [DELETE] /api/data/:id (D of CRUD, remove data with :id)
router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        Posts.remove(req.params.id).then((response) => {
          res.status(200).json(post);
          console.log(response);
        });
      }
    })
    .catch((err) => {
      console.log("Error deleting server from the server 500", err);
      res.status(500).json({ message: "The post could not be removed" });
    });
});

// [GET] /api/posts/:id/comments gets comments
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findById(id).then((post) => {
    if (post) {
      Posts.findPostComments(id)
        .then((comments) => {
          res.status(200).json(comments);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "The comments information could not be retrieved",
          });
        });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    }
  });
});

module.exports = router; // implement your posts router here
