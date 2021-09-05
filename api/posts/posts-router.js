// implement your posts router here

const express = require('express')

const Post = require('./posts-model')

const router = express.Router()

router.get('/api/posts', (req, res) => {
  Post.find(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({
        message: 'The post\'s information could not be changed'
      })
    })
})

router.get('./api/posts/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        })
      }
    })
})

router.post('/api/posts', (req, res) => {
  const postInfo = req.body

  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      message: 'Please provide title and contents for the post'
    })
  } else {
    Post.insert(postInfo)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'There was an error while saving the post to the database'
        })
      })
  }
})

router.put('/api/posts/:id', (req, res) => {
  const changes = req.body

  if (!changes.title || !changes.contents) {
    res.status(400).json({
      message: 'Please provide title and contents for the post'
    })
  } else {
    Post.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist'
          })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          message: 'The post information could not be modified'
        })
      })
  }
})

router.delete('/api/posts/:id', (req, res) => {
  Post.remove(req.params.id)
    .then(count => {
      if (count > o) {
        res.status(200).json({
          message: 'The post has been removed'
        })
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'The post could not be removed'
      })
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
  Post.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'The comments information could not be retrieved'
      })
    })
})

module.exports = router