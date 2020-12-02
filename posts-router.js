const express = require('express')

const Posts = require('./data/db')
const router = express.Router()


router.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: 'title and contents are required'})
    }
    Posts.insert(req.body)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'error adding the posts'})
        })

})


router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Error retrieving the posts '})
        })

})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(posts => {
            if(posts) {
                res.status(200).json(posts)
            }
            else{
                res.status(404).json({ errorMessage: 'posts id not found'})
            }
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Posts.remove(id)
        .then(posts => {
            if(posts.id !== id){
                res.status(200).json({ message: 'The post has been deleted'})
            }
            else{
                res.status(404).json({ message: 'The post could not be found'})
            }
        })
    
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Posts.update(id, changes)
        .then(posts => {
            if(posts){
                res.status(200).json(posts)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Error updating the post'})
        })
})



module.exports = router