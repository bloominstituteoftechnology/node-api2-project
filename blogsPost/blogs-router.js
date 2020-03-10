const express = require("express")

const Post = require("../data/db.js");

const router = express.Router();


router.get("/", (req,res) => {
    Post.find(req,query)
    .then( blogPost => {
        res.status(200).json(blogPost);
    })
    .catch(error => {
        console.log("error", error)
        res.status(500).json({
            message: "Error retriiveing Blog post"
        });
    });
});