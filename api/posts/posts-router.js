// implement your posts router here
const Posts = require("./posts-model");
const express = require("express");
const { route } = require("../server");
const router = express.Router();

//ENDPOINTS
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving the posts" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: `Post: ${id} can not be found.` });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving the post." });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  Posts.insert(body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error adding the post" });
    });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Posts.update(id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Can not find post." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Could not update post." });
    });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json(`${post}`);
      } else {
        res.status(404).json({ message: "Can not find post." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Can not delete post." });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findPostComments(id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(() => {
      res.status(500).json({ message: "Can not get comments from post" });
    });
});
module.exports = router;
