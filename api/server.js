// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

server.use(express.json());

server.listen(4000, () => {
    console.log('The server is running on port 4000');
});

const Post = require('./posts/posts-model');

server.get('/api/posts', (req, res) => {
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

server.get('/api/posts/:id', (req, res) => {
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

server.post('/api/posts',(req, res) => {
    Post.insert(req.params.name, req.params.bio)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    });
});

server.put('/api/posts/:id',(req, res) => {
    Post.update(req.params.name, req.params.bio)
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

server.delete('/api/posts/:id', (req, res) => {
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

server.get('/api/posts/:id/comments', (req, res) => {
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