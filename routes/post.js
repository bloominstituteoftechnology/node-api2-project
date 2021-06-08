const express = require("express");
const post = express.Router();
const helper = require("../data/db.js");

post.post("/", (req, res) => {
  const content = req.body;
  if (!content.title || !content.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  helper
    .insert(content)
    .then((r) => {
      if (r) {
        return res.status(201).json({ ...r, ...content });
      }
    })
    .catch(() => {
      return res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

module.exports = post;
