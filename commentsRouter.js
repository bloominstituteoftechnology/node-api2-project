const express = require("express")

const db = require("./data/db")

const router = express.Router();

router.post('/:id/comments', async (req, res) => {
    const comment = {
        post_id: req.params.id,
        text: req.body.text
    }
    try {
        if (!req.body.text) {
            return res.status(400).send("Comment needs a text prop")
        }
        const commentId = await db.insertComment(comment)
        res.status(201).send(commentId)
    } catch(e) {
        res.status(500).send("Something happened! " + e)
    }
})

router.get('/:id/comments', async (req, res) => {
    const id = req.params.id
    try {
        const post = await db.findPostComments(id)
        post ? res.status(201).send(post) : res.status(404).send("Comments not found.")
    } catch(e) {
        res.status(500).send("Something happened! " + e)
    }
})

router.get('/comments/:id', async (req, res) => {
    const id = req.params.id
    try {
        const comment = await db.findCommentById(id)
        comment ? res.status(201).send(comment) : res.status(404).send("Comment not found")
    } catch (e) {
        res.status(500).send("Something happened! " + e)
    }
})


module.exports = router;