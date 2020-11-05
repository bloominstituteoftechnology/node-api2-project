const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
const { checkUserID, checkPostData } = require("../middleware/post");

//GET//  ----> /api/posts
router.get("/", (req, res) => {
  const postsList = req.body;
  Posts.find(postsList)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      ///middleware APPLIED TO EVERY ROUTER ENDPOINT on CATCH
      //calling next with a parameter moves to the error middleware
      // at the end of the middleware stack
      next(error);
    });
});

//GET BY ID// ----> /api/posts/:id
///APPLYING MIDDLEWARE now
router.get("/:id", checkUserID(), (req, res) => {
  // user ges attached to the request in checkUserID
  res.status(200).json(req.postById);
});

//GET BY ID/COMMENTS// ----> /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((comment) => {
      comment
        ? res.status(200).json(comment)
        : res.status(404).json({
            message: `post of specified ID of ${id} does not exist`,
          });
    })
    .catch(next); //short way to call next with the error on catch
});

//GET BY ID/COMMENTS// ----> /api/posts/:id/comments/:id
router.get("/:id/comments/:id", checkUserID(), (req, res) => {
  const { id } = req.params;
  console.log(`params id is ${id}`);
  Posts.findCommentById(id)
    .then((comment) => {
      comment
        ? res.status(200).json(comment)
        : res.status(404).json({
            message: `post of specified ID of ${id} does not exist`,
          });
    })
    .catch((error) => {
      next(error);
    });
});

//POST /api/posts
router.post("/", checkPostData(), (req, res) => {
  // add MIDDLEWARE checkPostData to check if title and contents missing
  const newPost = req.body;
  Posts.insert(newPost)
    .then((newPost) => {
      newPost
        ? res.status(201).json(newPost)
        : res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
          });
    })
    .catch((error) => {
      next(error);
    });
});

//POST COMMENTS /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const post_id = req.params.id;
  //if no text input return error
  const text = req.body.text;
  if (!text) {
    return res
      .status(400)
      .json({ errorMessage: "please provide text for comment" });
  }

  const newComment = { post_id, text };
  Posts.insertComment(newComment)
    .then((postComment) => {
      postComment
        ? res.status(201).json(postComment)
        : res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
    })
    .catch((error) => {
      next(error);
    });
});

///PUT /api/posts/:id
router.put("/:id", checkPostData(), checkUserID(), (req, res) => {
  //apply checkPostData middleware to check for title and contents
  const changes = req.body;
  const { id } = req.params;
  console.log(`Id#${id}`);

  Posts.update(id, changes)
    .then((updatePost) => {
      console.log(updatePost, "update");
      updatePost
        ? res.status(200).json(updatePost)
        : res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
    })
    .catch((error) => {
      next(error);
    });
});

//DELETE /api/posts/:id
router.delete("/:id", checkUserID(), (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then((deletePost) => {
      deletePost > 0
        ? res
            .status(200)
            .json({ message: `post with id#${id} has been deleted` })
        : res.status(404).json({
            message: `Can NOT DELETE: post with id#${id} does not exist`,
          });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
