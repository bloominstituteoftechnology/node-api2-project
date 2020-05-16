const express = require("express");
const Blog = require("../node-api2-project/data/db")
const server = express();

server.use(express.json());

const PORT  = 5000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

server.get('/', (req, res) => {
    res.send('Hello Antoinette')
});


server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    
    res.status(200).json(newPost);
})

server.post('/api/posts/:id/comments', (req, res) => {
    const db = req.body;
    console.log(db);
    const newComment = req.body;
    res.status(200).json(newComment);
})

server.get('/api/posts', (req, res) => {
    Blog.find(req.query)
    .then(blog => {
        res.status(200).json(blog)  ;
    })
   
})

server.get('/api/posts/:id', (req, res) => {
    Blog.findById(req.query)
    .then(blog =>{
        res.status(200).json(blog)
    })
})

