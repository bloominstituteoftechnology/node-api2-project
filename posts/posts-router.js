const express = require("express");
const Posts = require("../data/db");
const { restart } = require("nodemon");
const router = express.Router();

/////////////////////////////////////
//POST - API/POSTS
router.post("/", (req, res) => {
  const newPost = req.body;
  //IF NO TITLE or CONTENTS THROW 404
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    //ELSE POST USING INSERT
    Posts.insert(newPost)
      .then((postData) => {
        Posts.findById(postData.id).then((added) => {
          res.status(201).json(added);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

/////////////////////////////////////
//POST - API/POSTS/:id/COMMENTS
router.post("/:id/comments", (req, res) => {
  const newComment = req.body;

  try {
    //IF TEXT IS MISSING THROW 400
    if (!newComment.text) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      //IF VALID 201
      newComment.post_id = req.params.id;
      Posts.insertComment(newComment)
        .then((comment) => {
          Posts.findCommentById(comment.id).then((added) => {
            res.status(201).json(added);
          });
        })
        //IF ID NOT FOUND THROW 404
        .catch((err) => {
          console.log(err);
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There was an error while saving the comment to the database",
    });
  }
});

/////////////////////////////////////
//GET API/POSTS
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

/////////////////////////////////////
//GET API/POSTS/:id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((database) => {
      const post = database[0];

      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//////////////////////////////////////////
//GET API/POSTS/:id/COMMENTS
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((database) => {
      const comments = database[0];
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});
////////////////////////////////////////
//DELETE API/POSTS/:id
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((check) => {
      if (check > 0) {
        res
          .status(200)
          .json({ message: "Your post has been successfully deleted." });
      } else {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post.",
      });
  } else {
    Posts.update(id, post)
      .then((item) => {
        if (item > 0) {
          res.status(200).json(post);
        } else {
          res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist.",
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  }
});

module.exports = router;
