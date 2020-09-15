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
    res.status(201).json(newPost);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

router.get("/", (req, res) => {
  db.find(req.query).then((posts) => {
    console.log(posts);
    res.status(200).json({ quey: req.query, data: posts });
  });
});

module.exports = router;
