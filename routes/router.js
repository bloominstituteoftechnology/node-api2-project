const express = require("express");
const router = express.Router();

const db = require("../data/db");

// endpoints

// router.post("/", (req, res) => {
//   res.status(201).json({ url: "/", operation: "POST" });
// });

router.post("/", (req, res) => {
  const newPost = req.body;
  db.add(newPost)
    .then((post) => {
      res.status(201).json({ success: true, post });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/", (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

// after api/posts
router.post("/:id/comments", (req, res) => {
  // const { id } = req.params;
  // const newComment = req.body;

  const newComment = {
    text: req.body.text,
    post_id: req.params.id,
  };

  db.insertComment(newComment)
    .then((comment) => {
      if (comment) {
        res.status(201).json({ success: true, comment });
      } else {
        res.status(404).json({ success: false, message: "No Comment!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;
  db.findById(id, post).then((post) => {
    if (post) {
      res.status(200).json(post);
    }
  });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = req.body;
  db.findCommentById(id, comments)
    .then((comment) => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "no comment!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error retrieving the comments!" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  db.update(id, newInfo)
    .then((updated) => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id invalid" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

module.exports = router;
