const express = require("express");
const data = require("./data/db");

const router = express.Router();

router.post("/", (req, res) => {
    req.body.title && req.body.contents;
    !title || !contents ? res.status(400).json({ message: "Please provide title and contents for the post." }):posts.insert(req.body)
    .then(() => {
        res.status(201).json(req.body);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database." });
     })
})

router.get("/", (req, res) => {
    posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})