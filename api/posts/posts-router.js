// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

//GET posts
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved."
            })
        })
});

//GET posts by ID
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved."
            })
        })
});

router.post('/',);

router.put('/:id',);

router.delete('/:id',);

router.get('/:id/comments',);


module.exports = router;