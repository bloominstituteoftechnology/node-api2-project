const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

//GET//  ----> /api/posts
router.get("/", (req, res) => {
  const postsList = req.body;
  Posts.find(postsList)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(error, "error retrieving posts");
      res
        .status(500)
        .json({ error: "The posts could not be retrieved, server error" });
    });
});

//GET BY ID// ----> /api/posts/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((postById) => {
      if (postById) {
        res.status(200).json(postById);
      } else {
        res.status(404).json({ message: "Cant find user by post ID" });
      }
    })
    .catch((error) => {
      console.log(error, "error in get BY ID catch");
      res
        .status(500)
        .json({ error: "can't retrieve the post, error on server" });
    });
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
    .catch((error) => {
      console.log(error, "error, could not retrieve comment from server");
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved" });
    });
});

//GET BY ID/COMMENTS// ----> /api/posts/:id/comments/:id
router.get("/:id/comments/:id", (req, res) => {
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
      console.log(error, "error, could not retrieve comment from server");
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//POST /api/posts
router.post("/", (req, res) => {
  const newPost = req.body;
  console.log("new POST = ", newPost);
  Posts.insert(newPost)
    .then((newPost) => {
      newPost
        ? res.status(201).json(newPost)
        : res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
          });
    })
    .catch((error) => {
      console.log(error, "error posting newPOST");
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
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
      console.log(error, "error in posting comment on server");
      res
        .status(500)
        .json({ error: "there was an error while saving the comment to DB" });
    });
});

///PUT /api/posts/:id
router.put("/:id", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

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
      console.log(error, "post info could not be modified/updated");
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

//DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
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
      console.log(error, "error deleting in ID");
      res
        .status(500)
        .json({ error: "post could not be removed, check server" });
    });
});

module.exports = router;
