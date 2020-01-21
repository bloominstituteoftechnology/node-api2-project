const express = require('express');
const server = express();
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comments');

server.use(express.json());


server.get('/', (req, res) => {
    res.send(`
      <h2>Tonis Blog</h>
      <p>blog/comment CRUD API</p>
    `);
});
// BLOG POST SCHEMA
/*
{
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
*/
server.use('/api/posts', blogRoutes);
// COMMENT SECTION SCEMA
/*
{
  text: "The text of the comment", // String, required
  post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
*/
server.use('/api/posts', commentRoutes);


module.exports = server;