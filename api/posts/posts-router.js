// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post does not exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error fetching posts'
            });
        });
});

router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        Post.insert(req.body)
            .then(({ id }) => {
                res.status(201).json({ id, ...req.body });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error inserting posts'
                });
            });
    } else {
        res.status(400).json({
            message: 'Title and contents are required'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, contents } = req.body
        if (!title || !contents) {
            res.status(400).json({ message: `Need to provide title and contents for ${id}` })
        } else {
            // validate post with id exist
            const post = await Post.findById(id)
            if (!post) {
                res.status(404).json({ message: `${id} does not exist` })
            } else {
                const newPost = await Post.update(id, { title, contents })
                if (newPost === 1) {
                    res.status(200).json({ id: Number(id), title, contents })
                } else {
                    res.status(500)
                }
            }
        }
    } catch (err) {
        res.status(500).json({ message: `ERROR updating post ` })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(post => {
            if (post) {
                Post.remove(id)
                    .then(count => {
                        if (count > 0) {
                            res.status(200).json({ id: post.id, title: post.title, contents: post.contents });
                        } else {
                            res.status(404).json({ message: `Post does not exist` })
                        }
                    })
            } else {
                res.status(404).json({ message: 'Post does not exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: `Post can't be removed` });
        });
});

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Post.findPostComments(req.params.id)
        if (comments.length) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: 'Comments does not exist' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving comments for this post'
        });
    }
});

module.exports = router;