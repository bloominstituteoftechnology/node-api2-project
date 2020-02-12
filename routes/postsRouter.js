const express = require('express');
const router = express.Router()

const posts = require('../data/db')


// GET all posts

router.get('/', (req, res) => {
  posts.find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({error: "The posts information could not be retrieved"})
  })

});




module.exports = router