const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/", (_, res) => {
    try {
        db.find()
            .then(res.status(200).json)
            .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }));
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get("/:id", (req, res) => {
    try {
        db.findById(req.params.id)
            .then(res.status(200).json)
            .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist." }));
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get("/:id/comments", (req, res) => {
    try {
        db.findPostComments(req.params.id)
            .then(res.status(200).json)
            .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist." }));
    } catch {
        res.status(500).json({ error: "The comments information could not be retrieved." });
    }
});

router.post("/", ({body}, res) => {
    try {
        if (body.title && body.contents) {
            let post = {
                title: body.title,
                contents: body.contents,
            };
            db.insert(post)
                .then(res.status(201).json)
                .catch(() => res.status(500).json({ error: "There was an error while saving the post to the database" }));
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }
    } catch {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

router.post("/:id/comments", (req, res) => {
    try {
        if (body.text) {
            let comment = {
                text: body.text,
                post_id: req.params.id,
            };
            db.insert(comment)
                .then(res.status(201).json)
                .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist." }));
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
        }
    } catch {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

router.delete("/:id", (req, res) => {
    try {
        db.remove(req.params.id)
            .then(() => res.sendStatus(204))
            .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist." }));
    } catch {
        res.status(500).json({ error: "The post could not be removed" });
    }
});

router.put("/:id", ({body}, res) => {
    try {
        if (body.title && body.contents) {
            db.update(req.params.id, {
                title: body.title,
                contents: body.contents,
            }).then(res.status(200).json)
                .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist." }));
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }
    } catch {
        res.status(500).json({ error: "The post information could not be modified." });
    }
})

module.exports = router;