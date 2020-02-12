// EXPRESS ROUTER --- makes other code dry

const express = require('express');

const PostsRouter = require('../data/db.js');

const router = express.Router();

// this router handles requests beginning in /api
// handle /api  /posts

module.exports = router;
// End of API router ------------------

// middleware

// route handlers - handles what comes after /api/posts

// GET /posts for rendering the blog posts
router.get("/posts", (req, res) => {

    console.log("retrieving GET /posts");

    PostsRouter.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        // log error to database
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the posts",
        });
    });
});
// WORKING ✅

// POST /posts for posting to the blog board
router.post("/posts", (req, res) => {
    console.log("sending POST /posts");
    const { title, contents } = req.body;

// start if statement with Error - truthy 
    if (!title || !contents) {
        res.status(400).json({
            errorMessage: 'Neither title, nor contents are included in this post'
        })
    } else {
        PostsRouter.insert({title, contents})
        .then(post => {
            console.log('posted the blog!', post);
            res.status(201).json(req.body);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Theres an err in insert'})
        })
    }
})
// WORKING ✅

// GET /posts/:id for specific post
router.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    PostsRouter.findById(id)
    .then(post => {
        console.log('Finding post by ID', post)
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Theres an err in finding post by id'})
    })
});
// WORKING ✅

// DELETE  /post/:id for specific post
router.delete("/posts/:id", (req, res) => {
    const id = req.params.id;

    PostsRouter.remove(id)
        .then(deleted => {
            console.log('Deleted the post', deleted)
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({deleted})
        });
});
// WORKING ✅

