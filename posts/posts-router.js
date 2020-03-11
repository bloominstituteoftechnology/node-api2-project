const express = require("express");
const Posts = require("../data/db.js");
const router = express.Router();

// post /api/posts
router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({
          error: "There was an error while saving the post to the database."
        });
    });
});

// post /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  Posts.insertComment(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      });
    });
});

// get /api/posts
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// get /api/posts/:id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// get /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
    Posts.findPostComments(req.params.id)
      .then(comment => {
        if (comment) {
          res.status(200).json(comment);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      });
  });

// delete /api/posts/:id
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Post successfully deleted" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

// put /api/posts/:id
router.put("/:id", (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

module.exports = router;
