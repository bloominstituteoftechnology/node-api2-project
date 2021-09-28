// implement your posts router here
const express = require('express');
const posts = require('./posts-model')
const router = express.Router()

router.get('/', (req, res) => {
    posts.find(req.query)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      });
  });

  router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'posts not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      });
  });

  router.post('/', (req, res) => {
    posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the posts',
        });
      });
  });

  router.get('/:id/comments', async (req, res) => {
    try {
      const { id } = req.params
      const comments = await posts.findCommentById(id)
      res.status(200).json(comments)
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  });

  module.exports = router