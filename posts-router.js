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

router.post("/api/posts/:id/comments", (req, res) => {
const id = req.params.id;
const comment = req.body;

    if(comment) {
        posts.insert(comment);
        res.status(201).json({ post });
    } else if (comment === undefined) {
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
    } else if (!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
});

router.get("/api/posts", (req, res) => {
    if(!posts) {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    } else {
        res.status(200).json(posts);
    }
});

router.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;

    let fetch = posts.find(post => id === post.id);

    if (fetch) {
        res.status(200.).json(fetch);
    } else if (fetch === undefined) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.get("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    const comment = req.body;

    let fetch = posts.find(post => id === post.id);

    if (fetch) {
        res.status(200.).json(fetch);
    } else if (fetch === undefined) {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
    } else {
        res.status(500).json({ message: "The comments information could not be retrieved." });
    }
});

router.delete("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id;

    let removed = posts.find(post => post.id === id);

    if (removed) {
        posts = post.filter(post => post.id !== id)
        res.status(200).json(removed);
    } else if (removed === undefined) {
        res.status(500).json({ errorMessage: "The post could not be removed"})
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
});

// --

router.put("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const update = req.body;
    update.id = id;

    let index = posts.find(post => id === post.id);

    if(update.title || update.contents) {
        if(index !== -1) {
            posts[index] = update;
            res.status(200).json({ post : index });
        } else {
            res.status(500).json({ errorMessage: "The post information could not be modified." });
        }
    } else if (update === undefined) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }

    module.exports = router;


});
