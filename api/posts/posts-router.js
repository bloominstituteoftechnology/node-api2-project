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

 
 


  module.exports = router;
