// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();
/*[GET] /api/posts
✓ [1] can get the correct number of posts
✓ [2] can get all the correct posts */
router.get("/", (req, res) => {
  Post.find(req.query)
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

/* GET] /api/posts/:id
✓ [3] can get all the correct posts by id
✓ [4] reponds with a 404 if the post is not found */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the post" });
    });
});

module.exports = router;
