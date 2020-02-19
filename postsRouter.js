const express = require("express");

const router = express.Router();

const db = require("./data/db");

router.use(express.json());

// Create post
router.post("/", (req, res) => {
  const data = req.body;

  if (!data.title || !data.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide a title and some content for the post."
      });
  } else {
    db.insert(data)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log("Error on POST /api/posts:", error);
        res.status(500).json({
          errorMessage: "There was an error saving the post to the DB"
        });
      });
  }
});

// Create comment on post by id
router.post("/:id/comments", (req, res) => {
  const data = req.body;

  if (!data.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide some text for the comment." });
  } else {
    db.insertComment(data)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res
            .status(404)
            .json({ errorMessage: "There was an error posting a comment." });
        }
      })
      .catch(error => {
        console.log("Error on POST /api/posts/:id/comments", error);
        res.status(500).json({
          errorMessage: "There was an error saving the comment to the DB"
        });
      });
  }
});

// get posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("Error on GET api/posts", err);
      res.status(500).json({
        errorMessage: "There was an error getting the posts from the DB"
      });
    });
});

// Returns the posts of a specific ID from the DB
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({
            errorMessage: "There was an error getting the specific ID."
          });
      }
    })
    .catch(err => {
      console.log("Error on GET api/posts/:id/comments", err);
      res.status(500).json({
        errorMessage: "There was an error getting the specific ID from the DB"
      });
    });
});

//get comments by post id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findCommentById(id)
    .then(comments => {
      if (comments.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({
            errorMessage:
              "There are no comments on that post or it does not exist."
          });
      }
    })
    .catch(err => {
      console.log("Error on GET api/posts/:id/comments", err);
      res.status(500).json({
        errorMessage: "There was an error getting the specific ID from the DB"
      });
    });
});

// Delete post by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({
            errorMessage: "There was an error deleting the specific post."
          });
      }
    })
    .catch(err => {
      console.log("Error on DELETE api/posts/:id", err);
      res.status(500).json({
        errorMessage:
          "There was an error deleting the specific post from the DB"
      });
    });
});

// Update post by ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!data.title || !data.contents) {
    res.status(400).json({
      errorMessage: "There was an error updating the specific post from the DB"
    });
  } else {
    db.update(id, data)
      .then(post => {
        if (post) {
          res.status(200).json(data);
        } else {
          res.status(404).json({
            errorMessage:
              "There was an error updating the specific post from the DB"
          });
        }
      })
      .catch(err => {
        console.log("Error on DELETE api/posts/:id", err);
        res.status(500).json({
          errorMessage:
            "There was an error updating the specific post from the DB"
        });
      });
  }
});

module.exports = router;
