const express = require("express");
const db = require("../data/db");
const router = express.Router();

// `POST` request to `/api/posts`:
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const newPost = db.insert({
    title: req.body.title,
    contents: req.body.contents,
  });

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else if (title && contents) {
    console.log(newPost);
    res.status(201).json({ message: "Post was successfully submited" });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

// `POST` request to `/api/posts/:id/comments`:
router.post("/:id/comments", (req, res) => {
  // 1) Define the info that will be passed as the comment to the post
  const commentData = { ...req.body, post_id: req.params.id };
  const commentText = req.body.text;
  // 2) Define the method in which I will post a comment
  const postComment = db.insertComment(commentData);

  // 3) Define the post, and check if the specified post even exist
  const specifiedPost = db.findById(req.params.id);

  specifiedPost
    .then((post) => {
      // What are the requirements that need to be meet to post a comment on a users post

      // The post needs to exists
      if (!post[0]) {
        res.status(404).json({
          message: `Post with id:${req.params.id} could not be found`,
        });
      }
      // The comment needs to have text values "commentText"
      else if (!commentText) {
        res.status(400).json({
          message:
            "Post didn't contain text, please provide text in your comment",
        });
      } else {
        postComment
          .then((commentId) => {
            console.log("I am the commentId.id", commentId.id);
            if (commentId.id > 0) {
              res.status(201).json({
                message: "Comment was created, and posted",
                new_comment_posted: commentText,
              });
            } else {
              res.status(400).json({ message: "Comment was not created" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log("I am the erro for network issue", err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });

  // Now I will just attempt to post the comment
});

// `DELETE` request to `/api/posts/:id`:
router.delete("/:id", (req, res) => {
  // Define the data I need to delete the specified post
  const id = req.params.id;
  const locatePost = db.findById(id);
  const deletePost = db.remove(id);

  // What are the requirments that need to be meet to remove the post from the database?
  // The post needs to exist
  locatePost
    .then((post) => {
      if (!post[0]) {
        res.status(404).json({ message: `Post with id:${id} does not exist` });
      } else {
        res.status(200).json({
          message: `Post with id:${id} was successfully deleted`,
          deleted_post: post,
        });
      }
    })
    .catch((err) => {
      console.log("Oops seems there was an error:", err);
      res.status(500).json({ message: "The post could not be removed" });
    });
  // Then I can know for certian that I can delete the post if the id matches the id
});

// `PUT` request to `/api/posts/:id`:

// `GET` request to `/api/posts`:
router.get("/", (req, res) => {
  db.find(req.query).then((posts) => {
    console.log(posts);
    res.status(200).json(posts);
  });
});

// `GET` request to `/api/posts/:id`:
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const getPostById = db.findById(id);

  getPostById
    .then((post) => {
      console.log("I am post", post);
      if (!post[0]) {
        res
          .status(404)
          .json({ message: `Post with id:${id} could not be found` });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

// `GET` request to `/api/posts/:id/comments`:
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  const getPostComments = db.findPostComments(id);

  getPostComments
    .then((comments) => {
      console.log("I am the comments", comments);
      if (!comments[0]) {
        res.status(404).json({ message: "This post has no comments" });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;
