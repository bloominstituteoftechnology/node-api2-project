// implement your posts router here
const { response } = require("express");
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

router
  .route("/")
  .get(async (request, response) => {
    try {
      const posts = await Post.find();
      response.json(posts);
    } catch (error) {
      response.status(500).json({
        message: "The posts information could not be retrieved",
        error: error.message,
        stack: error.stack,
      });
    }
  })
  .post(async (request, response) => {

  })

router
  .route("/:id")
  .get(async (request, response) => {
    try {
      const post = await Post.findById(request.params.id);
      if (!post) {
        response.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        response.json(post);
      }
    } catch (error) {
      response.status(500).json({
        message: "The post information could not be retrieved",
        stack: error.stack,
        error: error.message,
      });
    }
  })
  .post((request, response) => { })
  .put((request, response) => { })
  .delete((request, response) => { });

router.get("/:id/comments", (request, response) => { });

module.exports = router;
