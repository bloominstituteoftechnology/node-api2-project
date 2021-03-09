// implement your posts router here
const Post = require("./posts-model");
const express = require("express");
const router = express.Router();

//Get all posts
router.get("/", (req, res) => {
  Post.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Get post my ID

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Post.findById(id)
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
      res.status(500).json({ message: `${err}` });
    });
});

//Create a post
router.post("/", async (req, res) => {
  const post = await Post.insert(req.body);
  if (!post) {
    res.status(400).json({ message: `No ${post} found` });
  } else {
    res.status(201).json(post);
  }
});

//Update a post

router.put("/:id", (req, res) => {
  const id = req.params.id;

  Post.update(id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Remove a post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Find post comments
router.get("/comments", (req, res) => {
  Post.findPostComments(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

module.exports = router;
