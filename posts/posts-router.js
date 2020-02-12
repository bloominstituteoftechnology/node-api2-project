const express = require("express");

const posts = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
    
  
    posts.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the posts",
        });
      });
  });
  
  router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "post not found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the post",
        });
      });
  });
  
  router.post("/", (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  });

  router.post("/:id/comments", (req, res) => {
    const {text} = req.body;
    const {id} = req.params
    if(!text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    posts.findPostComments(id)
      .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(201).json(text);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "There was an error while saving the comment to the database",
        });
      });
  });

  router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
      .then(comment => {
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({ message: "comment not found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the comments",
        });
      });
  });

    router.delete('/:id', (req, res) => {
        posts.findById(req.params.id).then(post => {
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json(post);
        })
      posts.remove(req.params.id).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "The posts information could not be retrieved."})
    })
})

    router.put('/:id', (req, res) => {
        const {title, contents} = req.body;
        const changes = req.body
        const {id} = req.params
        posts.update(id, changes).then(post => {
        if (!post) {
            res.status(404).json({ message: "The post could not be found" });
        } else {
            res.status(200).json(post);
        }
        })
        .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error updating the post",
        });
        });
    });


  module.exports = router;