const express = require('express')

const db = require('../data/db')

const router = express.Router()

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    const post = {
        title: req.body.title,
        contents: req.body.contents
    }
    db.insert(post)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
})

router.post('/:id/comments', (req, res) => {
    if (!req.body.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }
    const comment = {
        post_id: `${req.params.id}`,
        text: req.body.text
    }
    db.findById(comment.post_id)
        .then((post) => {
            if (post.length > 0) {
                db.insertComment(comment)
                    .then((comment) => {
                        res.status(201).json(comment)
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            errorMessage: "Something went wrong"
                        })
                    })
            }
            else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((err) => {
            res.json({
                message: "Something went wrong"
            })
        })
})

router.get("/", (req, res) => {
    db.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post.length > 0) {
                res.status(200).json(post)
            }
            else if (post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

router.get('/:id/comments', (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post.length > 0) {
                db.findPostComments(req.params.id)
                    .then((comments) => {
                        if (comments.length > 0) {
                            res.status(200).json(comments)
                        }
                        else if (comments.length === 0) {
                            res.status(404).json({
                                message: "There's no comment on that post"
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: "The comments information could not be retrieved."
                        })
                    })
            }
            else if (post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
})

router.delete('/:id', (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post.length > 0) {
                db.remove(req.params.id)
                    .then((post) => {
                        res.json({
                            message: "Removed!"
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            errorMessage: "Something went wrong"
                        })
                    })
            }
            else if (post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "Something went wrong"
            })
        })

})

router.put('/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    db.findById(req.params.id)
        .then((post) => {
            if (post.length > 0) {
                db.update(req.params.id, req.body)
                    .then((post) => {
                        res.status(200).json(post)
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: "The post information could not be modified."
                        })
                    })
            }
            else if (post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong"
            })
        })
})
module.exports = router