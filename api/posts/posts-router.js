// implement your posts router here
let router = require('express').Router()
const Posts = require('./posts-model');

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
});

module.exports = router;