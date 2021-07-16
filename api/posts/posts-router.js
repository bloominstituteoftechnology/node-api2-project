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
    const { title, contents } = request.body;
    try {
      if (!request.body.title || !request.body.contents) {
        response.status(400).json({
          message: "Please provide title and contents for the post",
        });
      } else {
        const newPost = await Post.insert({title,contents});
        response.status(201).json({...newPost,title,contents});
      }
    }
    catch (error) {
      response.status(500).json({
        message: "There was an error while saving the post to the database",
        error: error.message,
        stack: error.stack,
      });
    }
  });


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
  .put(async (request, response) => { 
    try {
      const postID = await Post.findById(request.params.id);
      if (!postID) {
        response.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        const {title, contents} = request.body;
        if (!title || !contents ) {
          response.status(400).json({
            message:"Please provide title and contents for the post"
          });
        } else {
          const updates = await Post.update(request.params.id,request.body);
          response.json({...postID,title,contents});
        }
      }
    } catch (error) {
      response.status(500).json({
        message: "The post information could not be modified",
        stack: error.stack,
        error: error.message,
      });
    } 
  })
  .delete(async (request, response) => { 
    try {
      const postID = await Post.findById(request.params.id);
      if (!postID) {
        response.status(404).json({
          message: "The post with the specified ID does not exist",
        });
        } else {
         const removed = await Post.remove(request.params.id);
         response.json(postID);
        }
    } catch (error) {
      response.status(500).json({
        message: "The post information could not be removed",
        stack: error.stack,
        error: error.message,
      });
    } 
  });

router.get("/:id/comments", async(request, response) => {
  try {
    const postID = await Post.findById(request.params.id);
    if (!postID) {
      response.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comments = await Post.findPostComments(request.params.id);
    response.json(comments);
    }
  } catch (error) {
    response.status(500).json({
      message: "The comments information could not be retrieved",
      stack: error.stack,
      error: error.message,
    });
  }  
 });

module.exports = router;
