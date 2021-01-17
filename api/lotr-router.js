const express = require('express');
const router = express.Router();

const Hobbit = require('./db-helpers.js')

//Endpoints

router.get('/api/posts', (req, res) => {
    Hobbit.find(req.query)
    .then(hobbit => {
        res.status(200).json(hobbit);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get('/api/posts/:id', (req, res) =>{
    Hobbit.findById(req.params.id)
    .then(hobbit => {
        if(hobbit) {
            res.status(200).json(hobbit);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."} )
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})


router.get('/api/posts/:id/comments', (req, res) => {
    Hobbit.findCommentById(req.params.id)
    .then(comment => {
        if(comment.length > 0){
            res.status(200).json(comment)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved."
        });
    });
});



// | GET    | /api/posts              | Returns an array of all the post objects contained in the database.     (Done)                                                                                                    |
// | GET    | /api/posts/:id          | Returns the post object with the specified id.   (Done)      
                                                                                                                     
// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.   (Done)