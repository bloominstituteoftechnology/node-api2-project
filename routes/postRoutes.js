const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const newPost = db.insert({
    title: req.body.title,
    contents: req.body.contents,
  });

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else if (title && contents) {
    console.log(newPost);
    res.status(201).json({ message: "Post was successfully submited" });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

router.post("/:id/comments", (req, res) => {
  // Create a comment to a post specified by ID
  const id = req.params.id;
});

router.get("/", (req, res) => {
  db.find(req.query).then((posts) => {
    console.log(posts);
    res.status(200).json(posts);
  });
});

//`GET` request to `/api/posts/:id`:
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const getPostById = db.findById(id);

  getPostById
    .then((post) => {
      console.log("I am post", post);
      if (!post[0]) {
        res
          .status(404)
          .json({ message: `Post with id:${id} could not be found` });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  const getPostComments = db.findPostComments(id);

  getPostComments
    .then((comments) => {
      console.log("I am the comments", comments);
      if (!comments[0]) {
        res.status(404).json({ message: "This post has no comments" });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;
