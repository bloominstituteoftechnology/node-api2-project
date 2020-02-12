const express = require("express");

const Hubs = require("../data/db.js");

const router = express.Router(); // UPPERCASE R

// middleware

// route handlers - handles what comes after /api/posts
router.get("/", (req, res) => {
    const pagination = req.query;

    console.log("pagination", pagination);

    Hubs.find(pagination)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        // log error to database
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the posts",
        });
    });
});
