const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    !title || !contents 
    ? res.status(400).json({ errorMessage: "Please provide title and content for post"})
    : Posts.insert(req.body)
        .then(() => {
            res.status(201).json(req.body);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                errorMessage: "There was an error while saving the post to the database",
            });
        });
});


module.exports = router;