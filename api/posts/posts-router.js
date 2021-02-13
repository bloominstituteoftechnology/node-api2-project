// implement your posts router here
const express = require('express');
const db = require("./posts-model");


const router = express.Router();

router.get('/', (req,res) => {
  db.find()
  .then((response) => {
    res.send(response);
  })
  .catch(() => {
    res.status(500).send({ message: "The posts information could not be retrieved" });
  })
})

router.get('/:id', (req,res) => {
  db.findById(req.params.id)
  .then((response) => {
    if(response)
      res.send(response);
    else 
      res.status(404).send({ message: "The post with the specified ID does not exist" });
  })
  .catch(() => {
    res.status(500).send({ message: "The post information could not be retrieved" });
  })
})

router.post('/', (req,res) => {
  if(!req.body.title || !req.body.contents)
    res.status(400).send({ message: "Please provide title and contents for the post" });
  else{
    db.insert(req.body)
    .then((response) => {
      db.findById(response.id)
      .then((response) => {
        res.status(201).send(response);
      })
    })
    .catch(() => {
      res.status(500).send({ message: "There was an error while saving the post to the database" });
    })
  }
})

router.put('/:id', (req,res) => {
  if(!req.body.title || !req.body.contents)
    res.status(400).send({ message: "Please provide title and contents for the post" });
  else{
    db.findById(req.params.id)
    .then((resp) => {
      if(resp){
        db.update(req.params.id, req.body)
        .then(() => {
          db.findById(req.params.id)
          .then((response) => {
            res.status(200).send(response);
          })
        })
        .catch(() => {
          res.status(500).send({ message: "The post information could not be modified" });
        })
      }
      else 
        res.status(404).send({ message: "The post with the specified ID does not exist" });
      })
  }
})

router.delete('/:id', (req,res) => {
  db.remove(req.params.id)
  .then((resp) => {
    if(resp)
      res.send({message: "Post at ID: " + req.params.id + " has been deleted"});
    else
      res.status(404).send({ message: "The post with the specified ID does not exist" });
  })
  .catch(() => {
    res.status(500).send({ message: "The post could not be removed" });
  })
})

router.get("/:id/comments", (req,res) => {
  db.findPostComments(req.params.id)
  .then((response) => {
    if(response)
      res.send(response);
    else
      res.status(404).send({ message: "The post with the specified ID does not exist" });
  })
  .catch(() => {
    res.status(500).send({ message: "The comments information could not be retrieved" });
  })
})

module.exports = router;