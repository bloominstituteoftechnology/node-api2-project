// implement your posts router here
const Post = require("./posts-model");
const express = require("express");
const { json } = require("express");
const router = express.Router();

//Get all posts
router.get("/", (req, res) => {
  Post.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Get post my ID

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Create a post
router.post("/", (req, res) => {
  Post.insert(req.body)
    .then((post) => {
  if(!post){
      res.status(400)/json({message: "Please provide title and contents for the post"})
  }else{
    res.status(201).json(post);
    return post
  }
      
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Update a post

router.put("/:id", (req, res) => {
  const id = req.params.id;

  Post.update(id, req.body)
    .then((post) => {
      res.status(200).json(post);
      return post
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Remove a post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((post) => {
      res.status(200).json(post);
      return post
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

//Find post comments
router.get("/comments", (req, res) => {
  Post.findPostComments()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
});

module.exports = router;
