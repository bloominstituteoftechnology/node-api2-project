const express = require('express')
const router = express.Router();

const Posts = require('./posts-model');
// const Posts = require('../db-helpers')

router.post('/api/posts', (req,res) =>{

    Posts.posts(req.body)
        .then(posters => {
            res.status(201).json(posters);
        })
        .catch( e => {
            console.log(e);
            res.status(500).json({
                message: 'Error No posts going on sir'
            })
        })
});