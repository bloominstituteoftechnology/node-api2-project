// implement your posts router here

const Post = require('./posts-model')
const express = require('express')
const { router } = require('../server')
const req = require('express/lib/request')
const e = require('express')

router = express.Router()


// Posts Endpoints
// 1 [GET] /api/posts

router.get('/', (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

// 2 [GET] /api/posts/:id

router.get('/:id', (req, res) => {
  const {id} = req.params

  Post.findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
      } else {
        res.status(200).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

// 3 [POST] /api/posts

router.post('/', (req, res) => {
  const newPost = req.body

  Post.insert(newPost) 
    .then(post => {
      if(!post.title || !post.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
      } else {
        res.status(201).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({message: "There was an error while saving the post to the database" });
    })
})

// 4 [PUT] /api/posts/:id

router.put('/:id', (req, res) => {
  const changes = req.body
  const {id} = req.params

  Post.findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
      } else {
        Post.insert(id, changes)
          .then(change => {
            if (!change.title || !change.contents) {
              res.status(400).json({ message: "Please provide title and contents for the post" })
            } else {
              res.status(200).json(change)
            }
          })
          .catch(err => {
            res.status(500).json({ message: "The post information could not be modified" })
          })
      }
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

// 5 [DELETE] /api/posts/:id
router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(post => {
      if(!post) {
        res.status({ message: "The post with the specified ID does not exist" })
      } else {
        res.status(200).json(post)
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The post could not be removed" })
    })
})

// 6 [GET] /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  Post.findPostComments(req.params.id)
  .then(post => {
    if(!post) {
      res.status({ message: "The post with the specified ID does not exist" })
    } else {
      res.status(200).json(post)
    }
  })
  .catch(err => {
    res.status(500).json({ message: "The comments information could not be retrieved" })
  })
})


module.exports = router