const express = require('express');

const server = express();

server.use(express.json());

const Posts = require('./db.js');

server.get('/', (req, res) => {
    res.send('fuck off')
});

server.get('/api/posts', (req, res) => {
    Posts.send()
        .then(res => {
            res.status(200).json(res)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was a goddamn fucking error'
            })
        })
})

module.exports = server;