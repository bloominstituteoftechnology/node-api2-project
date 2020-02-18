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


  module.exports = router; 