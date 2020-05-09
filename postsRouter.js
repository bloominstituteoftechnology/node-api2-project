const express = require("express")

const db = require("./data/db")

const router = express.Router();

function checkRequiredKeys(body, requiredKeys) {
    for (const key of requiredKeys) {
        if (!body[key]) {
            return false
        }
    }
    return true
}

function checkAllowedKeys(body, allowedKeys) {
    allowedKeys = new Set(allowedKeys)
    for (const key in body) {
        if (!allowedKeys.has(key)) {
            return false
        }
    }
    return true
}

router.post('/', async (req, res) => {
    const requiredKeys = ['title', 'contents']
    try {
        !checkRequiredKeys(req.body, requiredKeys) && res.status(400).send("Post needs both title and content")
        const postId = await db.insert(req.body)
        res.status(201).send(postId)
    } catch(e) {
        res.status(500).send("Something happened! " + e)
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await db.find()
        posts ? res.status(201).send(posts) : res.status(404).send("No posts are available.")
    } catch(e) {
        res.status(500).send("Something happened! " + e)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await db.findById(id);
        post ? res.status(201).send(post) : res.status(404).send("Post not found.")
    } catch(e) {
        res.status(500).send("Something happened! " + e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedAmount = await db.remove(req.params.id)
        removedAmount ? res.status(201).json(removedAmount) : res.status(404).json("Post not found.")
    } catch(e) {
        res.status(500).json("Something happened! " + e)
    }
})

router.put('/:id', async (req, res) => {
    const allowedKeys = ['title', 'contents']
    try {
        !checkAllowedKeys(req.body, allowedKeys) && res.status(400).json("Post edit needs either contents or title")
        const post = await db.update(req.params.id, req.body)
        post === 1 ? res.status(201).json(post) : res.status(404).json("post not found")
    } catch(e) {
        res.status(500).json("Something happened! " + e)
    }
})



module.exports = router;