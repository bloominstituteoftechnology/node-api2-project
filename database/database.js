const express = require('express');

const Post = require ('./hubs-model.js')

const database = express.database();



database.get('/', (req, res) => {
    Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  database.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
  });

  database.get('/:id/comment', (req, res) => {
    Post.findById(req.param.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
  });
  
  database.post('/:id', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        if (post) {
      res.status(201).json(post);
        } else {
            res.status(500).json({message: 'cannot add post'})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
  });

  database.post('/:id/comments', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        if (post) {
      res.status(201).json(post);
        } else {
            res.status(500).json({message: 'cannot add post'})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
  });
  
  database.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
  });
  
  database.put('/:id', (req, res) => {
    const changes = req.body;
    Post.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
  });
  module.exports = database;