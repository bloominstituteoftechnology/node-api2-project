const express = require("express"); // imports express
const Posts = require('../data/db.js'); // path to data
const router = express.Router(); // import Router with express

// These will handle any request that begins with /api/posts:

// GET /api/posts... Returns an array of all the post objects contained in the database:
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then((posts) => {
        res.status(200).json({ queryString: req.query, posts });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error retrieving posts."})
    })
})

// GET /api/posts/:id... Returns the post object with the specified id:
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving the post."})
    })
})

// GET /api/posts/:id/comments... 	Returns an array of all the comment objects associated with the post with the specified id:
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then((comments) => {
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ message: "Comments not found."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving comments."})
    })
})

// POST /api/posts... Creates a post using the info sent inside the request body:
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then((post) => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error adding post."})
    })
})

// POST /api/posts/:id/comments... 	Creates a comment for the post with the specified id using information sent inside of the request body.
// router.post('/:id/comments', (req, res) => {
//     Posts.update(req.params.id, )
// })

module.exports = router;