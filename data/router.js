
const express = require('express');
const Posts = require('./db.js');
const router = express.Router();




// If the information about the post is valid:

// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.
// If there's an error while saving the post:

// cancel the request.
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.

router.post('/', (req, res) => {
    const postInfo = req.body;  
    if(postInfo.title && postInfo.contents) {
        Posts.insert(postInfo)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({err: "There was an error while saving the post to the database"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})


router.get('/', (req, res) => {
    Posts.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})


module.exports = router;

