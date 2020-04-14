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

// This creates a new post
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else if (req.body.title || req.body.contents) {
    db.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }
});

// router.post("/:id/comments", (req, res) => {
//   if (!req.params.id) {
//     res.status(404).json({
//       message: "The post with the specified ID does not exist.",
//     });
//   } else if (!req.body.text) {
//     return res.status(400).json({
//       errorMessage: "Please provide text for the comment.",
//     });
//   } else if (req.params.id) {
//     db.insertComment(req.body.text)
//       .then((comment) => {
//         res.status(201).json(comment);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     return res.status(500).json({
//       error: "There was an error while saving the comment to the database",
//     });
//   }
// });

router.put("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else if (!req.body.title || !req.body.contents) {
    return escape.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else if (req.params.id || req.body.text || req.body.contents) {
    db.update(req.params.id, req.body)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(500).json({
      error: "The post information could not be modified.",
    });
  }
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else {
    db.remove(req.params.id)
      .then((count) => {
        if (count < 0) {
          res.status(200).json({ message: "This post has been nuked" });
        } else {
          res.status(404).json({ message: "This post cannot be found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "This post could not be removed" });
      });
  }
});

module.exports = router;
