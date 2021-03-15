// implement your posts router here
const express = require('express')
const router = express.Router();
const Post = require('./posts-model.js');

// API/POSTS ENDPOINTS
router.get('/', (req, res) => {
    Post.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: `The post with the specified ID ${id} does not exist`
                })
            }
            
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: `The post information could not be retrieved`
            });
        });
});

router.post('/', async (req, res) => {
    const newPost = req.body;
    // let newID;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        });
    } else {
        Post.insert(newPost)
            .then((newpostID) => {
                res.status(201).json(newpostID)
                // newID = newpostID;
                
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: 'There was an error while saving the post to the database'
                })
            })

            // Post.findById(newID)
            // .then((post) => {
            //     if (post) {
            //     res.status(200).json(post);
            //     } else {
            //         res.status(404).json({
            //             message: `The post with the specified ID ${newID} does not exist`
            //         })
            //     }
    
            // })
            // .catch((error) => {
            //     console.log(error);
            //     res.status(500).json({
            //         message: `The post information could not be retrieved`
            //     });
            // });    
    }
});

module.exports = router;