// implement your posts router here

const express = require('express')
const router = express.Router()

const Post = require("./posts-model")

// All Posts route
router.get("/", (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(422).json(err))
})

// Post by ID route

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if (post) {
                res.status(500).json(post)
            }
            else {
                res.status(404).json({ message: 'Post not found' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Error retrieving the Post' })
        })
}
)

// Gets comments based on Post ID route

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    Post.findCommentById(id)
        .then(comments => {
            if (comments) {
                res.status(500).json(comments)
            }
            else {
                res.status(404).json({ message: 'Comments not found' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'Error retrieving the Comments' })
        })
})

// Create a Post route

router.post("/", (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
        res.status(500).json('Please provide a title and content!')
    }
    else {
        Post.insert(newPost)
            .then(post => {
                res.status(201).json(newPost)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
}
)

// Update an existing post route

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Post.update(id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(changes)
            }
            else {
                res.status(404).json({ message: 'Post could not be found' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error updating Post' })
        })
})

// Delete Route

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.remove(id)
        if (!deletedPost) {
            res.status(404).json('Post doesnt exist')
        }
        else {
            res.status(201).json(deletedPost)
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;
