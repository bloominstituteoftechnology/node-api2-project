// implement your server here


const express = require("express");
const adopterRouter = require("./adopters/adopters-router.js");
const postsRouter = require("./posts/posts-router.js");
const server = express();



server.use(express.json());
server.use("./api/adopters", adopterRouter);
server.use("./api/posts", postsRouter);
//So now we're getting all of the methods from posts-model.js
//  {find,
//   findById,
//   insert,
//   update,
//   remove,
//   findPostComments,
//   findCommentById,
//   insertComment, }

// //The 'body' of a blog post is: 
// {
//     title: "The post title", // String, required
//     contents: "The post contents", // String, required
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }

// //The 'body' of a Comment is: 
// {
//     text: "The text of the comment", // String, required
//     post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }


server.get('/', (req,res) => {
    res.send(`
        Lambda Blog Project
    `);
});


// require your posts router and connect it here





//MAKE SURE TO EXPORT YOUR SERVER SO INDEX CAN HAVE ACCESS TO THE API!
module.exports = server;