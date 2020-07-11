const express = require('express');
const router = express.Router();
const Posts = require('./posts-model.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        req.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The posts information could no be retreived."
        });
    });
});

module.exports = router;