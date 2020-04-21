const express = require("express");
const router = express.Router();

const Posts = require("../data/db");

// POST @ /api/posts
router.post("/", (req, res) => {
  res.status(200).send(`hello from the POST /posts endpoint.`);
  //?
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  //?
});

//GET @ /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      // log error from database
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts" });
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
      res.status(500).json({ message: "Error retrieving post" });
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
