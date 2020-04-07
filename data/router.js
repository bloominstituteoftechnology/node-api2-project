const express = require('express');

const Data = require('./db.js');

const router = express.Router();

// /api/posts
router.get('/', (req, res) => {
    Data.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "the posts info could not be retrieved." });
    })
});

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post" });
    } else {
        Data.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "there was an error while saving the post" })
        })
    }
})

// /api/posts/:id

router.get('/:id', (req, res) => {
    Data.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post does not exist." })
        }
    })
    .catch(error => {
        //log error to database
        console.log(error);
        res.status(500).json({ error: 'Post info could not be retrieved.' })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Data.update(req.params.id, changes)
    if (!req.body.title || !req.body.contents) {
        res
          .status(400)
          .json({ errorMessage: "Please provide title and contents for the post." })
    }
})

module.exports = router;