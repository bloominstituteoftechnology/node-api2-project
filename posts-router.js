const express = require("express");
const db = require("./data/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findById(id)
      .then(postId => {
        res.status(200).json(postId);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  }
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findPostComments(id)
      .then(postComment => {
        res.status(200).json(postComment);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      });
  }
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    db.insert(req.body)
      .then(postRes => {
        res.status(201).json(postRes);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  console.log("text: ", req.body);

  const commentData = req.body;
  commentData.post_id = req.params.id;

  db.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        if (!req.body.text) {
          res
            .status(400)
            .json({ message: "Please provide text for the comment." });
        } else {
          db.insertComment(commentData)
            .then(postComment => {
              res.status(201).json(postComment);
            })
            .catch(err => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database"
              });
            });
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error finding the id post"
      });
    });
});

// Delete posts

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deletePost => {
      if (!deletePost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "the post has been deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

// update the post

router.put("/:id", (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then(postUpdate => {
      if (!postUpdate) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!req.body.title || !req.body.contents) {
        res
          .status(400)
          .json({ error: "Please provide title and contents for the post." });
      } else {
        res.status(200).json(postUpdate);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
