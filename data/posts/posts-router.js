const express = require('express');

const Posts = require("../db");

const router = express.Router(); //invoke Router()

router.post('/', (req, res) => {
    const data = req.body;
    if(!data.title || !data.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else if (data.title && data.contents) {
        Posts
    .insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log("Error inserting post to db", err);
        res.status(500).json({
            message: "error inserting the post"
        })

    })
    } else {
        res.status(500).json({
            message: "Error inserting the post"
        })
    }
});