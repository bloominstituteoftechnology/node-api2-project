const express = require("express")
const Posts = require("../data/db")
const router  = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Hello from the GET/ posts endpoint')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send(`Hello from the GET/ posts /${id} endpoint`)
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    res.status(200).send(`hello from the GET /${id} /comments`)
})

router.post('/', (req, res) => {
    res.status(201).send('hello from the POST /posts endpoint')
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id
    res.status(201).send(`hello from the POST /post /${id} /comments endpoint`)
}) 

router.delete('/:id', (req, res) => {
    res.status(204)
})

router.put('/:id', (req, res) => {
    res.status(200).send(`hello from the PUT /posts /${id} `)
})

module.exports = router