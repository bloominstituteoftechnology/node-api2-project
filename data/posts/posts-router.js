const express = require('express');

const Posts = require("../db");

const router = express.Router(); //invoke Router()

router.post('/', (req, res) => {
    const data = req.body;
    if(!data.title || !data.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else if (data.title && data.contents) {
        Posts
    .insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log("Error inserting post to db", err);
        res.status(500).json({
            message: "error inserting the post"
        })

    })
    } else {
        res.status(500).json({
            message: "Error inserting the post"
        })
    }
});

router.post('/:id/comments', (req, res) => {
    const data = req.body;
    const {id} = req.params;

    Posts.findById(id)
    .then(post => {
        if(!post.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (!data.text) {
            res.status(400).json({
                errorMessage: "Please provide text for the comment."
            })
        } else if (data.text){
            Posts.insertComment(data)
            .then(comment => {
                res.status(201).json(data.text)
            })
            .catch(err => {
                console.log("Error inserting comment to DB...", err);
                res.status(500).json({
                    error: "There was an error while saving the comment"
                })
            })
        }
    })
});

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.error("Error getting posts from DB...", err);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })

});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    Posts.findById(id)
    .then(post => {
        if(!post.length){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else{
          res.status(200).json(post);  
        }

    })
    .catch(err => {
        console.error("Error getting single post from DB...", err)
        res.status(500).json({
            error: "The comments information could not be retrieved"
        })
    })
})

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    Posts.findById(id).then(post => {
        if(!post.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (post.length) {
            Posts.findPostComments(id).then(comm => {
                if (!comm.length) {
                    res.status(500).json({
                        error: "The comments information could not be retrieved"
                    });
                } else if (comm.length) {
                    res.status(200).json(comm);
                }
            })
        }
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Posts.findById(id).then(post => {
        if(!post.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            });
        } else if (post.length) {
            Posts.remove(id)
            .then(dlt => {
                res.status(200).json({
                    "This post has been deleted": post[0]
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: "The post could not be removed"
                });
            });
        }
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    Posts.findById(id).then(post => {
        if (!post.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (post.length) {
            if (!data.title || !data.contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post"
                })
            } else if ( data.title && data.contents) {
                Posts.update(id, data)
                .then(upd => {
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log("Error updating post in DB...", err);
                    res.status(500).json({
                        error: "The post information could not be modified"
                    });
                });
            }
        }
    });
});


module.exports = router; 