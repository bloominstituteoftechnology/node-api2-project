// implement your posts router here
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

// POSTS ENDPOINTS
router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the posts.',
            });
        });
}); 

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
});

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            if (post) {
                res.status(201).json(post);
            } else {
                res.status(400).json({ message: "Please provide title and contents for the post" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message:  "There was an error while saving the post to the database",
            });
        });
});


router.put('/:id', (req, res) => {
    const changes = req.body;

    // missing required params
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" });
        return
    }

    Post.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" })
        }) 
});


router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The post could not be removed" })
        })
});


router.get('/:id/comments', (req, res) => {
    

    Post.findPostComments(req.params.id)
        .then(post => {
            if (post) {
                console.log("post", post)
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })

    // Post.findCommentById(req.params.id)
    //     .then(post => {
       
    //         if (post) {
    //             console.log("post", post)
    //             res.status(200).json(post);
    //         } else {
    //             console.log("in the else")
    //             res.status(404).json({ message: "The post with the specified ID does not exist" })
    //         }
    //     })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved" })
        })

});



module.exports = router;