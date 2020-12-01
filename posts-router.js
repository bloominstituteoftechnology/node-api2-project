const express = require('express')

const Posts = require('./data/db')
const router = express.Router()


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

module.exports = router