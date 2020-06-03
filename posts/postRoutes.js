const express = require("express");
const router = express.Router();
router.use(express.json());
const db = require("../data/db");

router.get("/", (req, res) => {
  db.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((data) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((data) => {
      if (data.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(data[0]);
      }
    })
    .catch((data) => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id: postId } = req.params;
  db.findById(postId)
    .then((data) => {
      // post with matching id has been found
      if (data.length !== 0) {
        // it found something
        db.findPostComments(postId)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((data) => {
            res.status(500).json({
              error: "The comments information could not be retrieved.",
            });
          });
      } else {
        // it didn't find anything
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for your post.",
    });
  } else {
    db.insert(post)
      .then(({ id }) => {
        db.findById(id).then((newPost) => {
          res.status(201).json(newPost);
        });
      })
      .catch((data) => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { id: post_id } = req.params;
  const { body: comment } = req;
  db.findById(post_id)
    .then((data) => {
      if (data.length !== 0) {
        if (!comment.text) {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        } else {
          db.insertComment({ ...comment, post_id })
            .then(({ id: comment_id }) => {
              db.findCommentById(comment_id).then((newComment) => {
                res.status(201).json(newComment);
              });
            })
            .catch((data) => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database",
              });
            });
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((data) => {
      res.status(500).json(data);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body: changes } = req;
  if (!changes.title || !changes.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    db.findById(id)
      .then((data) => {
        if (data.length !== 0) {
          // found it
          db.update(id, changes)
            .then((u) => {
              if (u !== 0) {
                db.findById(id)
                  .then((post) => {
                    res.status(200).json(post);
                  })
                  .catch(() => {
                    res
                      .status(500)
                      .json({
                        error: "The post information could not be modified.",
                      });
                  });
              } else {
                res.status(404).json({
                  message: "The post with the specified ID does not exist.",
                });
              }
            })
            .catch((data) => {
              res.status(500).json(data);
            });
        } else {
          // didn't find it
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      })
      .catch((data) => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id: postId } = req.params;
  db.findById(postId)
    .then((data) => {
      if (data.length !== 0) {
        // found something
        db.remove(postId).then((data) => {
          if (data !== 0) {
            res.status(200).json(data);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist.",
            });
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((data) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;
