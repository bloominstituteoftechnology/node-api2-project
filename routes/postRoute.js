const express = require("express");
const router = express.Router();

// file import
const db = require("../data/db");

// grab all posts

router.get("/", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

module.exports = router;
