// implement your posts router here

const express = require('express');

const router = express.Router(); 

const postsModel = require('./posts-model');


router.get('/', (req, res) => { 
    postsModel.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopters',
        });
      });
  });

  router.get('/:id', (req, res) => {  
    postsModel.findById(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopters',
        });
      });
  });

  router.post('/', (req, res) => {
      
    postsModel.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the adopter',
        });
      });
  });




module.exports = router;

