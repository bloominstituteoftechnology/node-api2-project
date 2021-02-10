// implement your posts router here

const Post = require('./posts-model');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be found' });
    });
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: `The post with the specified ID: ${id} does not exist` });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be found' });
    });
});


router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  Post.findPostComments(postId)
    .then((comment) => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          message: `The comment with the specified ID:${postId} does not exist`,
        });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The comment information could not be retrieved' });
    });
});


router.post('/', (req, res) => {
  Post.insert(req.body)
    .then((newPost) => {
      if (newPost) {
        res.status(201).json(newPost);
      } else {
        res
          .status(400)
          .json({ message: 'Please provide title and contents ' });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the post ',
      });
    });
});


router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Post.update(id, changes)
    .then((updatedPost) => {
      if (!id) {
        res
          .status(404)
          .json({ message: `The post with the specified ID: ${id} does not exist` });
      } else if (!changes) {
        res
          .status(400)
          .json({ message: 'Please provide title and contents ' });
      } else {
        res.status(200).json(updatedPost);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be changed' });
    });
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: 'User was successfully destroyed ' });
      } else {
        res
          .status(404)
          .json({ message: `The post with the specified ID: ${id} does not exist` });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'The post could not be destroyed' });
    });
});


module.exports = router;