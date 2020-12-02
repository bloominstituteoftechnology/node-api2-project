const express = require('express');
const server = express();
server.use(express.json());

const HelperFunc = require('./data/db')

///ENDPOINTS
server.post('/api/posts', (req, res) => {
})

server.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const text  = req.body;

    if (!text){
        res.status(404).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        HelperFunc.insertComment(text)
        .then(newComment => {
            res.status(201).json(newComment)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
})

server.get('/api/posts', (req, res) => {
    HelperFunc.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
    
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    HelperFunc.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;

    try { //really should check that the post exists before grabbing comments ..
        HelperFunc.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
    }
    catch {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    HelperFunc.remove(id)
        .then(value => { //line 62 returns 1 if true, 0 if false
            if (value > 0) {
                res.status(200).json({ message: "post deleted." })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { contents, title } = req.body;

    if (!contents || !title) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        HelperFunc.update(id, req.body)
            .then(value => {
                if (value > 0) {
                    return HelperFunc.findById(id)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }

})

///OTHER ENDPOINTS
server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
  });
  