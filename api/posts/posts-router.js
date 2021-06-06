// implement your posts router here
const Post = require("./posts-model.js");
const express = require("express");

const router = express.Router();

//POSTS ENDPOINTS

// 1 | GET    | /api/posts | Returns **an array of all the post objects** contained in the database
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

// 2 | GET    | /api/posts/:id  | Returns **the post object with the specified id**
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

// 3 | POST   | /api/posts  | Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post("/", (req, res) => {
  Post.insert(req.body)
    .then((post) => {
      if (!post.title || !post.contents) {
        res.status(400).json("Please provide title and contents for the post");
      } else {
        res.status(201).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

// 4 | PUT    | /api/posts/:id  | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    if (!changes.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else if (!changes.title || !changes.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const updatedPost = await Post.update(id, changes);
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

// 5 | DELETE | /api/posts/:id   | Removes the post with the specified id and returns the **deleted post object**
router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then((post) => {
      if (post.id) {
        res.status(200).json(post.id);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});

// 6 | GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id
router.get("/:id/comments", (req, res) => {});

module.exports = router;
