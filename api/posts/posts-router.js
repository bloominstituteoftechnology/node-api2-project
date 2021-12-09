// implement your posts router here
const model = require("./posts-model");
const express = require("express");
const router = express.Router();

//get all posts
router.get("/", (req, res) => {
  model
    .find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

//get posts by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  model
    .findById(id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

//post new post
router.post("/", (req, res) => {
  const newPost = req.body;
  model
    .insert(newPost)
    .then(() => {
      if (!newPost.title || !newPost.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(201).json(newPost);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

//update a post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const postChanges = req.body;

  try {
    if (!postChanges.title || !postChanges.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      const updatedPost = model.update(id, postChanges);
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(updatedPost);
      }
    }
  } catch {
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removed = model.remove(id);
    if (!removed) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(201).json(removed);
    }
  } catch {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

//get all of the comments
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const postComms = model.findPostComments(id);
    if (!postComms) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(200).json(postComms);
    }
  } catch {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
