const express = require("express");
const db = require("./data/db.js");
const router = express.Router();
router.use(express.json());

// START

router.post("/api/posts", (req, res) => {
    const post = req.body;

    if (post.title || post.contents) {
        if(db.insert(req.body)) {
            res.status(201).json({ post })
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database" })
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});

// --

router.post("/api/posts/:id/comments", (req, res) => {
const id = req.params.id;
const comment = req.body;

if(comment) {
    posts.insert(comment);
    res.status(201).json({ post });
} else if (comment === undefined) {

} else if (!comment.text) {

} else {

}

});