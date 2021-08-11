// implement your posts router here
const Poster = require('./posts/model')
const express = require("express");
const router = express.Router();

//POSTERS ENDPOINTS
//POSTERS ENDPOINTS
//POSTERS ENDPOINTS

router.get('/', (req, res) => {
    Poster.find(req.query)
    .then(posters => {
        res.status(200).json(posters);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Error retreiveing the posters`,
        });
    });
});

router.get('/:id', (req, res) => {
    Poster.findById(req.params.id)
    .then(poster => {
        if (poster) {
            res.status(200).json(poster);
        } else {
            res.status(404).json({message: `Poster not found`});
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Error retreiveing the posters`,
        });
    });
})

router.get('/:id/comments', (req, res) => {
    Poster.findPostComments(req.params.id)
        .then(posts => {
            if (posts.length > 0 ) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({message: "No comment for this poster"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error recieving comment for this poster"
            })
        })
})

router.post('/', (req, res) => {
    Poster.insert(req.body)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the Poster',
            });
        });
})

router.put('/:id', (req,res) => {
    Poster.update(req.body, changes)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({message: "The Poster could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'Error updating the Poster',
            });
        });
})

router.delete('/:id', (req, res) => {
    Poster.remove(req.params.id)
        then(count => {
            if (count > 0) {
                res.status(200).json({message: "The Poster has been sent to the void"})
            } else {
                res.stats(404).json({message: "The Poster could not be found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error removing the Poster',
            });
        });
})

module.exports = router