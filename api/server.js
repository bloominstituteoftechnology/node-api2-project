// BUILD YOUR SERVER HERE
const express = require('express');
const app = express();
app.use(express.json());

// ROUTES
const postsRouter = require('./posts/postRouter');
app.use('/api/posts/', postsRouter);




module.exports = app;
