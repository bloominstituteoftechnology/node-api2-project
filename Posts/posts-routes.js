const express = require("express");
const db = require("../data/db");

const router = express.Router();

// This GETs all the posts
router.get("/", (req, res) => {
  db.find(req.body)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

// MALANI GRACE TULLOCH

// This GETs a single post by ID
router.get("/:id", (req, res) => {
  if (req.params.id) {
    db.findById(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else {
    return res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

// This GETs all comments for a single post ID
router.get("/:id/comments", (req, res) => {
  if (req.params.id) {
    db.findPostComments(req.params.id)
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else {
    return res.status(500).json({
      error: "The comments information could not be retrieved.",
    });
  }
});

// router.post("/", (req, res) => {

//   if (!req.body.title || !req.body.contents) {
//     return res.status(400).json({
//       errorMessage: "Please provide title and contents for the post.",
//     });
//   } else if (req.body.title || req.body.contents) {
//     db.insert(req.body)
//       .then((post) => {
//         res.status(201).json(post);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     res.status(500).json({
//       error: "There was an error while saving the post to the database",
//     });
//   }
// });

module.exports = router;
