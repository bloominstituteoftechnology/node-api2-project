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

 
 


  module.exports = router;
