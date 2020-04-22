const express = require("express");
const router = express.Router();

const Posts = require("../data/db");

// POST @ /api/posts
router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  Posts.insertComment(req.body)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

//GET @ /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving post" });
    });
  //?
});

// DELETE @ /api/posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //
});

//PUT @ /api/posts/:id
router.put("/", (req, res) => {
  const { id } = req.params;
});

module.exports = router;
