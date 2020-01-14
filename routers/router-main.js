const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {

    console.log(req.query);
    db.find(req.query)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
      
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the db"
        });
      });
  });

router.get("/:id", (req, res) => {
    const id = req.params.id

    db.findById(id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        }
        res.status(404).json({ errorMessage: "id could not be returned"})
    })
    .catch(error => {
        console.log(error);
            res.status(500).json({
                errorMessage: "Could not retrieve the database"
            })
    })
})

router.post('/', (req, res) => {
    const {title, contents} = req.body

    if(!title || !contents){
        res.status(400).json({errorMessage: "Please provide a title and some contents"})
    }
    db.insert({title, contents})
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "Could not add the message"
        })
    })
})

router.post('/:id/comments', (req, res) => {
    const {text, post_id} = req.body
    
    if(!text && !post_id) {
        res.status(400).json({ errorMessage: "Please provide the text and post_id"})
    }
    db.insertComment(req.body)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage: "Error adding the message"})
    })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id

    db.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The post has been deleted" })  
        }
        res.status(404).json({ message: "Post not found" });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error removing the post"
        })
    })
})

module.exports = router;
