const express = require("express");

const router = express.Router();
const Posts = require("../data/db");

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Could not post",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  Posts.insertComment(commentInfo)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while saving",
        err,
      });
    });
});

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Cannot retrieve post.",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved.",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: `Comment with id ${id} does not exist`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved.",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: `Post with id ${id} does not exist`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `Do not pass go, do not collect 200 dollars.`,
      });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "This post has been deleted.",
        });
      } else {
        res.status(404).json({
          message: `The post with ID ${id} does not exist.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Cannot delete",
      });
    });
});

module.exports = router;
