const express = require('express');
const router = express.Router();

const Hobbit = require('./db-helpers.js');
const { count } = require('console');

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


router.post('/api/posts', (req, res) => {
    Hobbit.insert(req.body)
    .then(hobbit => {
        res.status(201).json(hobbit);
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved."
        });
    });
})



router.post('/api/posts/:id/comments', (req, res) => {
    Hobbit.insertComment(req.body)
    .then(hobbit => {
        res.status(201).json(hobbit);
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved."
        });
    });
})

router.delete('/api/posts/:id', (req,res) => {
    Hobbit.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({message: 'Deleted'})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    });
})


router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    Hobbit.update(req.params.id, changes)
    .then(hobbit => {
        if(hobbit) {
            res.status(200).json(hobbit);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved."
        });
    });

})
