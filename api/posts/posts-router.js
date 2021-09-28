// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

//get post-----------
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "cant retreive posts bruh, try again",
      });
    });
});
router.get("/:id ", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message:
          "there's error with retreiving your post buddy, try another way",
      });
    });
});
module.exports = router;
