// implement your posts router here
const express = require('express');
const router = express.Router();

const Posts = require('./posts-model.js')


router.get('/', (req, res) => {
    Posts.find(req.query)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'post info not retrieved',
        });
      });
  });

  router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the post',
        });
      });
  });

  router.post('/', (req, res) => {
    Posts.insert(req.body)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({
          message: 'Please provide title and contents for the post',
        });
      });
  });
 

  router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'message: "The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      });
  });

  router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been nuked' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      });
  });


router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
      .then(comments => {
        if (comments.length > 0) {
          res.status(200).json(dogs);
        } else {
          res.status(404).json({ message: 'No comments for this post' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the dogs for this adopter',
        });
      });
  });

  module.exports = router;
