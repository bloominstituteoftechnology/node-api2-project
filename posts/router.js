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
        if (!post.title || !post.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post."})
        } else {
            res.status(201).json(post);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the post to the database"})
    })
})

// POST /api/posts/:id/comments... 	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
    // check that text exists:
    if (!req.body.text) {
        res.status(400).json({ message: "No text in comment."})
    } else {
        // find post id that matches req id:
        Posts.findById(req.params.id)
        .then((post) => {
            // post is either post with matching id or empty array...
            if (post.length) {
                let comment = req.body;
                Posts.insertComment(comment, req.params.id)
                res.status(201).json(comment)
            } else {
                res.status(404).json({ message: "Post not found."})
            }
        })
    }
})

// DELETE /api/posts/:id... Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Posts.findById(id)
    .then((post) => {
        // post is either post with matching id or empty array...
        if (post.length) {
            try {
                Posts.remove(id)
                .then(numRemaining => {
                    res.status(200).json(post)
                })
            // change database to no longer include deleted post.
            }
            catch(err) {
                res.status(500).json({ errorMessage: "The post could not be removed."})
            }
        } else {
            res.status(404).json({ message: "Post not found."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Sorry, something went wrong."})
    })
})

// PUT /api/posts/:id.... Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let changes = req.body;
    // make sure not missing title or contents
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Missing title and/or contents."})
    } else {
        Posts.findById(id)
        .then((post) => {
            // post is either post with matching id or empty array...
            if (post.length) {
                try {
                    Posts.update(id, changes)
                    .then(count => {
                        if (count > 0) {
                            // updated correctly:
                            res.status(200).json(post)
                        }
                    })
                }
                catch(err) {
                    res.status(500).json({ errorMessage: "The post could not be removed."})
                }
            } else {
                res.status(404).json({ message: "Post not found."})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Sorry, something went wrong."})
        })
    }
})

module.exports = router;