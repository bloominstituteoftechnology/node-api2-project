const express = require("express");
const router = express.Router();
const data = require("../data/db");

// router.post("/:id/comments", (req, res) => {
//   res.status(200).send("yay! you did it from comment route!");
// });

// When the client makes a POST request to /api/posts/:id/comments: CREATE
router.post("/:id/comments", (req, res) => {
  const commentBody = req.body;
  const id = req.params.id;
  if (!commentBody.text) {
    res.status(400).json({ errormessage: "Missing the content section" });
  } else {
    data
      .findById(id)
      .then(post => {
        if (!post) {
          res.status(404).json({ error: "post not found" });
        } else {
          data
            .insertComment(commentBody)
            .then(cmdata => {
              res.status(201).json(cmdata);
            })
            .catch(err => {
              console.log("comments err", err);
              res
                .status(500)
                .json({ error: "failed to make comment in comment section" });
            });
        }
      })

      .catch(err => {
        // console.log('There was an error while saving the comment to the database', err)
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
          error: err
        });
      });
  }
});

// When the client makes a GET request to /api/posts/:id/comments:
router.get("/:id/comments", (req, res) => {
  data
    .findCommentById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The comments information could not be retrieved.",
        err
      });
    });
});

// When the client makes a PUT request to /api/posts/:id: UPDATES
router.put("/:id", (req, res) => {
  const updateBody = req.body;
  const id = req.params.id;
  if (!updateBody.title || !updateBody.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }
  data
    .findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      } else {
        data
          .update(id, updateBody)
          .then(updated => {
            res.status(201).json(updated);
          })
          .catch(err => {
            console.log("update update=put error", err);
            res.status(500).json({ error: "failed to save update" });
          });
      }
    })
    .catch(err => {
      console.log("failed=post to update", err);
      res.status(500).json({ error: "The post information could not be modified" });
    });
});

module.exports = router;
