// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
});

router.get('/:id',);

router.post('/',);

router.put('/:id',);

router.delete('/:id',);

router.get('/:id/comments',);


module.exports = router;