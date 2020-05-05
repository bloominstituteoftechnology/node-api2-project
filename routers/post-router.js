const express = require("express");

const Posts = require("../data/db.js"); // <fix the folder path></fix>

const router = express.Router(); // mind the UPPERCASE R by visual studio code


//Creates a post using the information sent inside the request body.
//#1 -Creates a post using the information sent inside the request body.
//@route /api/posts
router.post("/", (req, res) => {
    const addData = req.body;
    //If the request body is missing the title or contents property:
    if (!addData.title || !addData.contents) {
        res
            .status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            });
        //If the information about the post is valid:
    } else {
        Posts.insert(addData)
            .then(postRes => {
                res.status(201).json(postRes);
            })
            //
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                });
            });
    }
});

//#2 -Creates a comment for the post
//-with the specified id using information sent inside of the request body.
//When the client makes a POST request to @route /api/posts/:id/comments:
router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const comments = {...req.body, post_id: id };
    if (!comments.text) {
        res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
    } else {
        Posts.findById(id)
            .then(post => {
                //If the post with the specified id is not found:
                if (!post) {
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist." });
                    //If the information about the comment is valid:
                } else {
                    Posts.insertComment(comments)
                        .then(res => {
                            res.status(201).json(res);
                        })
                        .catch(error => {
                            console.log(error);
                            //If there's an error while saving the comment:
                            res.status(500).json({ error: "There was an error while saving the comment to the database" });
                        });
                }
            })

    }
});



//#3 -When the client makes a GET request to /api/posts:
// Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
    Posts.find(req.query)
        .then(postData => {
            res.status(200).json(postData);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            //If there's an error in retrieving the posts from the database:
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});


//#4 -When the client makes a GET request to /api/posts/:id
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
                //If the post with the specified id is not found:
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            //If there's an error in retrieving the post from the database:
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

//#5 -When the client makes a GET request to /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
    Posts.findCommentById(req.params.id)
        .then(post => {
            //if the post with the specified id is not found:
            if (post) {
                res.status(200).json(post);
                //If the post with the specified id is not found:
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            //If there's an error in retrieving the comments from the database:
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

//#6 -When the client makes a DELETE request to /api/posts/:id
router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            //If the post with the specified id is not found:
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            //If there's an error in removing the post from the database:
            res.status(500).json({ error: "The post could not be removed" });
        });
});


//#7 -When the client makes a PUT request to /api/posts/:id:
router.put("/:id", (req, res) => {
    Posts.update(req.params.id, req.body)
        .then(posts => {
            if (posts === undefined) {
                res
                    .status(404)
                    .json({ message: 'The post with the specified ID does not exist.' });
            } else if (!req.body.title || !req.body.contents) {
                res.status(400).json({
                    errorMessage: 'Please provide title and contents for the post.'
                });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({ error: 'The post information could not be modified.' });
        });
});
// mind the S in exportS
module.exports = router; // same as below

// export default server; // ES2015 MODULES