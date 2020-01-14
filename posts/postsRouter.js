// const router = require("express").Router();
const express = require("express");

const router = express.Router();

router.use(express.json());

const Posts = require("../data/db.js");

router.get("/test", (req, res) => {
  res.send(`
    
      <p>Welcome to the posts Router API</p>
    `);
});

//Post posts (create a post)
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  Posts.insert(req.body)
    .then(post => {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});
// Post comments (create a comment)
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const { text } = comment;
  if (!text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  }
  Posts.insertComment(req.body)
    .then(comment => {
      if (!comment) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(201).json(comment);
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});
//Get posts
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});
//get posts by Id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)

    .then(post => {
      if (!post[0]) {
        //why is this not working

        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        console.log(post);
        res.status(200).json(post);
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});
//get posts by comments
router.get("/:id/messages", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(comment => {
      if (!comment[0]) {
        //why is this not working

        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        console.log(comment);
        res.status(200).json(comment);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errormessage: "error getting hubs messages" });
    });
});
//Delete Request
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The user could not be removed"
      });
    });
});
//Put Request update post
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const { title, contents } = user;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  Posts.update(id, user)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          message: "The post information was updated successfully"
        });
      }
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: "The post information could not be modified."
      });
    });
});
module.exports = router;
