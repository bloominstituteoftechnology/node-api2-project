const express = require('express');
const Posts = require('../data/db.js');
const router = express.Router();

router.post('/', (req, res) => {
    const postInfo = req.body
    Posts.insert(postInfo)
        .then(post => {
            if (postInfo.title && postInfo.contents) {
                res.status(201).json(postInfo)
            } else {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
})

router.post('/:id/comments', (req, res) =>{
    const {id} = req.params
    const comm = req.body
})


//gets all of the posts
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "COULD NOT FIND WHAT YOU WERE LOOKING FOR" })
        })
})

router.post('/:id/comments', (req, res) =>{
    const {id} = req.params
    const comments = req.body

    Posts.insertComment(comments)
    .then(comment =>{
        if (comment === 1) {
            res.status(201).json(comment)
        } else if(!comment) {
            res.status(400).json({message: 'please provide more info... like typing in a comment?'})
        } else {
            res.status(404).json({message:'The post you were trying to reach by id does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: ' there was an error saving your comment to database'})
    })
})

//gets a post by specific id
router.get('/:id', (req, res) => {
    const {id} = req.params
    Posts.findById(id) 
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })  
})
//gets a specific comment
router.get('/:id/comments', (req, res) => {
  const {id} = req.params
  Posts.findPostComments(id)
  .then(comment => {
      if(comment.length > 0){
          res.status(200).json(comment)
      } else {
          res.status(404).json ({message: 'The ID does not exist make sure you have it right'})
      }
  })
  .catch( err => {
      res.status(500).json({error:' could not retrived from database'})
  })
})

// Delete request
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Posts.remove(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'Could not find the post with specified id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not remove post... try again?' })
        })
})

//Put requests

router.put('/:id', (req,res) => {
    const {id} = req.params
    const updates = req.body

    Posts.update (id, updates)
    .then(post => {
        if(post ===1) {res.status(200).json(post)}
        else if (!updates.title || !updates.comments) {
            res.status(400).json({message: 'Provide context for the post'})
        } else (post === 0) {
            res.status(404).json({message: 'the post you were looking for by id does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'post information could not be modified, please retry'})
    })
})
module.exports = router;