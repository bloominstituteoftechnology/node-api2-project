const express = require('express');

const router = express.Router();

const db = require('../data/db.js');

router.use(express.json());

// Creates a post using the information sent thru req.body
router.post('/', (req, res) => {
  const data = req.body;
  if (!data.title || !data.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
  } else {
    db.insert(data)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log('error on POST /api/posts', error);
      res.status(500).json({
        errorMessage: 'There was an error while saving the post to the database'
      })
    })
  }
})

// Creates a comment for the post with specified id using information sent thru req.body
router.post('/:id/comments', (req, res) => {
  // const id = req.params.id;
  const data = req.body;
  console.log(data);
  if (!data.text) {
    res.status(400).json({ errorMessage: 'Please provide text for the comment.'})
  } else {
    db.insertComment(data)
    .then(comment => {
      console.log(comment);
      if (comment) {
        res.status(201).json(data)
      } else {
        res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      console.timeLog('error on POST /api/posts/:id/comments', error);
      res.status(500).json({
        errorMessage: 'There was an error while saving the comment to the database'
      })
    })
  }
})


module.exports = router;