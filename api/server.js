// implement your server here
const express = require( "express" );
const server = express();
server.use( express.json() );

// require your posts router and connect it here
const postsRouter = require( "./posts/posts-router.js" );
server.use( "/api/posts", postsRouter );

server.get( "/", ( req, res ) => {
    res.send( `
  <h2>Unit 4 Module 1 Assignment 2 API</h2>
  <p>Welcome to the server</p>
  ` );
} );

module.exports = server; // EXPORT YOUR SERVER instead of {}