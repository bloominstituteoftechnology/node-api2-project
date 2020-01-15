const express = require("express");

const data = require("../data/db.js");

const router = express.Router();

router.use(express.json());

// router.get("/", (req, res) => {
//     res.status(200).send("hello from the GET /api/posts")
// });

// gets all the posts from database
router.get("/", (req, res) => {
  data
    .find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The posts information could not be retrieved"
      });
    });
});

// gets a specific posts comments from the database
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  data
    .findPostComments(postId)
    .then(comments => {
        if (postId) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specific ID does not exist"
            })
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The comments information could not be retrieved"
      });
    });
});

// gets a specific post from the database
router.get("/:id", (req, res) => {
  const id = req.params.id;
  data
    .findById(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          message: "The post with the specific ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved"
      });
    });
});

// create a new post
router.post("/", (req, res) => {
  const newPost = req.body;
  data
    .insert(newPost)
    .then(newwPost => {
      if (newPost.title || newPost.contents) {
        res.status(201).json(newwPost);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contexts for the post"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

// create a new comment
router.post("/:id/comments", (req, res) => {
  const newCom = req.body;
  data.insertComment(newCom);
  const ID = req.params.id;
  data
    .findById(ID)
    .then(newwCom => {
      if (newwCom.length === 0) {
        res.status(404).json({
          message: "The post with the specific ID does not exist"
        });
      } else if (!newCom.text) {
        res.status(400).json({
          errorMessage: "Please provide text for the comment"
        });
      } else {
        res.status(201).json({ newCom });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
});

// delete a post
router.delete("/:id", (req, res) => {
  const delId = req.params.id;
  data
    .remove(delId)
    .then(deleted => {
      if (!delId) {
        res.status(404).json({
          message: "The post with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

// update a post
router.put("/:id", (req, res) => {
  const upId = req.params.id;
  const upPost = req.body;
  data.update(upId, upPost)
  .then(updated => {
      if (!upId) {
          res.status(404).json({
              message: "The post with the specified ID does not exist"
          })
      } else if (!upPost.title || !upPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
      } else {
          res.status(200).json({ updated })
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: "The post information could not be modified"
      });
  });
});

module.exports = router;
