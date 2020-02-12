const express = require('express');
const posts = require('../data/db')
const commentsRouter = require('./commentsRouter.js');
const router = express.Router()

router.use('/:id/comments', commentsRouter);




// GET all posts

router.get('/', (req, res) => {
  posts.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({error: "The posts information could not be retrieved"})
  })

});

// GET post by ID
// - If the ID doesn't exist, it returns an empty array
//   so we have to make sure that there's something IN
//   the array by looking at the 1st index point.

router.get('/:id', (req, res) => {
  posts.findById(req.params.id)
  .then(post => {
    if (post[0]) {
      res.status(200).json(post)
    } else {
      res.status(404).json({error: "The post with the specified ID could not be found"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "The post information could not be retrieved"})
  })
});

// DELETE post
// - Removes a post by ID

router.delete('/:id', (req,res) => {
  posts.remove(req.params.id)
  .then(user => {
   if (user && user > 0){
     res.status(200).json({message: 'The post was removed'})
   } else{
     res.status(404).json({errorMessage: 'The post with the specified ID does not exist'})
   }
 })
 .catch(err => {
   res.status(500).json({errorMessage: 'The post with the specified ID does not exist.'})
 })
})

// PUT Post
//  - Edit Post within the database (requires ID)
//  - if ID doesn't exist, return 404
//  - if title or contents property is missing, return 400

router.put('/:id', (req, res) => {
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({errorMessage: "Please provide title and content for the post."})
  } else {
    posts.update(req.params.id, req.body)
    .then(post => {
      if(post){
        res.status(200).json({...req.body, id: req.params.id})
      }else{
        res.status(404).json({errorMessage: "The post with the specified ID does not Exist"})
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: "There was an error editing the post."})
    })
  }
})

// POST new post
// - if title or contents prop missing, return 400

router.post('/', (req, res) => {
  if(!req.body.title || !req.body.contents) {
    res.status(400).json({errorMessage: "Please provide title and content for the post."})
  } else {
    posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({errorMessage: "There was an error while saving the post to the database."})
    })
  }
})

module.exports = router