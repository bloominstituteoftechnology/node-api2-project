const express = require('express');
const posts = require('../data/db');
const router = express.Router();

router.get("/posts", (req, res) => {
  
  posts
  .find(req.query)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({
      message: "Error retrieving posts"
    })
  })
}
)


module.exports = router;