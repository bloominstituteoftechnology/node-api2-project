// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

module.exports = router;