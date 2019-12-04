const express = require('express');

const router = express.Router();

const db = require('../data/db.js');

router.use(express.json());

router.post('/', (req, res) => {
  db.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding to posts'
    })
  })
})

module.exports = router;