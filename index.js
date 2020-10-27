const express = require('express');
const expressRouter = require('./express-router');

const server = express();

server.use(express.json());
server.use(expressRouter);

const Post = require('./data/db');

server.get('/', (req, res) => {
    res.send('wow');
})

server.get('/api/posts', (req, res) => {
    Post.find()
    .then(data=>{
        console.log(res)
        res.status(200).json(data)
    })
    .catch(err=>{
        console.timeLog(err);
        res.status(500).json({
            message: 'No good'
        })
    })
})

server.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'No good, cant get post'
        })
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'Cant get comments wow'
        })
    })
})

server.delete('/api/posts/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    })
})

server.put('/api/posts/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        return
    }

    Post.update(req.params.id, req.body)
    .then(data=>{
        if (data) {
        res.status(201).json(data)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    })
})

server.listen(5050, () => {
    console.log('server is listening on port 5050, fuck you')
})