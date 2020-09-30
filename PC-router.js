const express = require("express");
const posts = require("./data/db");
const {
    findById,
    find,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } = require("./data/db");
const router = express.Router();

router.get("/api/posts", (req, res) => {
  posts
    .find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});
router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(201).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post.",
      });
  }
  posts
    .insert(req.body)
    .then((posts) => {
      res.status(201).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

router.post("/api/posts/:id/comments", (req, res) => {
  // const {id} = req.params

  // const comment = {...req.body, post_id:id}
  if (!req.body.text) {
    res.status(400).json({ message: "Add text" });
  }

  //  posts
  insertComment({
    text: req.body.text,
    post_id: req.params.id
  })
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "could not create post" });
    });
});

router.delete("/api/posts/:id", (req,res) =>{
    posts
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been deleted",
        });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });

})

router.put("/api/posts/:id" , (req,res) =>{
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    posts
    .update(req.params.id, req.body)
    .then((post) =>{
        if(post){
            res.status(204).json(post)
        } else {
            res.status(404).json({ errorMessage: "Please provide title and contents for the post." })
        }
        
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({error: "The post information could not be modified."})
    })
})

module.exports = router;
