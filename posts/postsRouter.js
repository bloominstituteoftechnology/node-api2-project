const express = require("express");
const db = require("../data/db");

const router = express.Router();


//returns array of every post
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

//returns a single post by id
router.get('/:id', (req, res) => {
  const {id} = req.params
  db.findById(id)
    .then(post => {
      post ? res.status(200).json(post) : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

//returns an array of comments associated with a particular post
router.get(`/:id/comments`, (req, res) => {
  const {id} = req.params;
  db.findPostComments(id)
    .then(comments => {
      if (!comments){
        res.status(404).json({ message: "The post with the specified ID does not exist or has no comments" })
      } else {
        res.status(200).json(comments)
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts comments could not be retrieved." })
    })
})

//posts a new post and returns the id of the post
router.post('/', (req, res) => {

  if (!req.body.title || !req.body.contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.insert(req.body)
      .then(postId => {
        res.status(201).json(postId);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post has not been created" })
    })
  }
})

//adds a comment to the posts comments array and returns the id of the comment
router.post(`/:id/comments`, (req, res) => {
    req.body.post_id = req.params.id
  if (!req.body.text ){
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  } else {
    db.insertComment(req.body)
      .then(commentId => {
        res.status(201).json(commentId)
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The comment has not been created" })
    })
  }
})

//deletes a post by id and returns how many times it's deleted things for some reason
router.delete(`/:id`, (req, res) => {
  const {id} = req.params
  db.remove(id)
    .then(count => {
      if(!count) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
      res.status(200).json(count)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The comment has not been created" })
    })
})

//edits an existing post by id and returns the changed post
router.put(`/:id`, (req, res) => {
  const {id} = req.params;
  if (!req.body.title || !req.body.contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  else{
    db.update(id, req.body)
      .then(count => {
        if (count !== 1){
          res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
          res.status(200).json(req.body)
        }
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The comment has not been created" })
    })
  }
})

module.exports = router