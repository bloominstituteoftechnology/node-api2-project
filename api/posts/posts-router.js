const express = require("express");

const Posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
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

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  });
});

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      if (!req.body.title || !req.body.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
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

router.put("/:id", (req, res) => {
  Posts.update(req.body, req.params.id)
    .then((post) => {
      if (!req.params.id) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else if (!req.body.title || !req.body.contents) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

router.delete("/:id", (res, req) => {
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "It's gone!" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specific ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "The post could not be removed" });
    });
});

router.get("/:id/comments", (res, req) => {
  Posts.findById(req.params.id).then((post) => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res
        .status(500)
        .json({ message: "The comments information does not exist" });
    }
  });
});

module.exports = router;
