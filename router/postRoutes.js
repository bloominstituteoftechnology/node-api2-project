const router = require('express').Router();


const db = require('../data/db')


const commentRoutes = require('./commentRoutes');

//USE COMMENTS ROUTE
router.use('/', commentRoutes);



router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post with ID specified not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});
router.put('/:id', (req, res) => {
    const id = req.params.id;

    const { title, contents } = req.body;



    if (title && contents) {
        db.update(id, { title: title, contents: contents })
            .then(result => {
                if (result) {
                    db.findById(id)
                        .then(post => {
                            res.status(200).json(post);
                        })
                        .catch(error => {
                            res.status(500).json({ error: "There was an error retrieving post." });
                        });
                } else {
                    res.status(404).json({ message: "Post with specified ID not found." });
                }
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});


router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (title && contents) {
        db.insert({ title: title, contents: contents })
            .then(postID => {
                db.findById(postID.id)
                    .then(post => {
                        res.status(201).json(post);
                    })
                    .catch(error => {
                        res.status(500).json({ error: "There was an error retrieving post." });
                    });
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                db.remove(id)
                    .then(() => {
                        res.status(200).json({ message: "Success" });
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The post could not be removed." });
                    });
            } else {
                res.status(404).json({ message: "Post with ID specified not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});




module.exports = router; 