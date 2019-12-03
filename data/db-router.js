const express = require('express');

const Posts = require('./db');

const router = express.Router();

router.use(express.json());//might be able to remove

router.post('/', (req, res) => {
    Posts.find(req.query)
    .then()
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

router.post('/', (req, res) => {
    
})

router.get('/', (req, res) => {
    
})

router.get('/', (req, res) => {
    
})

router.get('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})

router.put('/', (req, res) => {
    
})

module.exports = router;