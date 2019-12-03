const express = require('express');

const Posts = require('./db');

const router = express.Router();

router.use(express.json());

//GET requests

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log('error on GET/api/posts', error);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
    .then(posts => {
        posts ? res.status(200).json(posts) :
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(error => {
        console.log('error from GET/:id', error);
        res.status(500).json({ error: "The post information could not be retrieved." })
    });
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comment => {
        !comment ? res.status(500).json({ message: "The post with the specified ID does not exist." }) : res.status(200).json(comment);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

//POST requests

router.post('/', (req, res) => {
    const userPosts = req.body;
    Posts.insert(userPosts)
    .then(posts => {
        userPosts.title && userPosts.contents === '' ?
            res.status(400).json({ errorMessage: "Please provide title and contents for the post."}) : res.status(201).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    });

});

router.post('/', (req, res) => {
    
})

//DELETE request


router.delete('/', (req, res) => {
    
})

//PUT request

router.put('/', (req, res) => {
    
})

module.exports = router;