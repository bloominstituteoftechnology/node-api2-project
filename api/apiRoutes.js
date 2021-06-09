const express = require('express');

const postsRouter = require('./posts/posts-router');

const router = express.Router();
router.use('/posts', postsRouter)

module.exports = router;