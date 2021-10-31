// implement your posts router here
const Post = require('./posts-model');
const router = require('express').Router();

router.get('/api/posts', (req, res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({
            message: 'message: "The posts information could not be retrieved'
        });
    });
});

router.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post information could not be retrieved"})
        });
});

router.post('/api/:posts',(req, res) => {
    console.log(req.params.posts)
    Post.insert(req.params.posts)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    });
});

router.put('/api/posts/:id',(req, res) => {
    Post.update(req.params.id, req.params.posts)
    .then(posts => {
        if (posts) {
            res.status(201).json(posts)
        } else {
            res.status(400).json({ message: "Please provide title and contents for the post"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be modified"})
    });
});

router.delete('/api/posts/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The post could not be removed"})
        });
});

router.get('/api/posts/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
    .then(posts => {
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        });
    });
});

module.exports = router