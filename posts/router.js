const express = require('express');


const Posts = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
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

router.post('/', (req, res) => {
  Posts.add(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
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
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
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

router.get("/:id/messages", (req,res) =>{
    Post.findHubMessages(req.params.id)
    .then((messages) => {
        res.status(200).json(messages);
    })
    .catch((err) => {
        res.status(500).json({errorMessage: "error reading message"})
    })
});

router.post("/:id/messages", (req,res) =>{
    Posts.addMessage(req.body)
    .then((message) => {
        res.status(200).json(message);
    })
    .catch((err) => {
        res.status(500).json({errorMessage: "error reading message"})
    })
});



module.exports = router;