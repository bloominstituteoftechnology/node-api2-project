// implement your posts router here
const express = require('express');

const router = express.Router();

const Post = require('./posts-model');

console.log('posts MODEL ->', Post)

router.get('/', (req, res) => {
    Post.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      });
  });

  router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(Post => {
        if (Post) {
          res.status(200).json(Post);
        } else {
          res.status(404).json({ message: 'Post not found with this id' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the post',
        });
      });
  });

module.exports = router;