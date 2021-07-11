// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();
/*[GET] /api/posts
✓ [1] can get the correct number of posts
✓ [2] can get all the correct posts */
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

module.exports = router;
