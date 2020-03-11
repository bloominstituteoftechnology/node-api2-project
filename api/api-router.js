const express = require('express');
const router = express.Router();
const postsRouter = require('../posts/posts-router.js');

router.use('/posts' , postsRouter);

module.exports = router;