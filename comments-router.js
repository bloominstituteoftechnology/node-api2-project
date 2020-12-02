const express = require('express')
const Comments = require('./data/db')

const router = express.Router()

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Comments.findCommentById(id)
        .then(comment => {
            res.status(200).json(comment)
            
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ errorMessage: 'commnet not found'})
        })
        
})

router.post('/:id/comments', (req, res) => {
   const { id } = req.params
   const text = req.body

   if(!req.body.text){
       res.status(500).json({ errorMessage: 'text for comment is required'})
   }
   Comments.insertComment(text)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(err => {
        console.log(err.message)
        res.status(404).json({ message: 'the post with the specified id does not exist'})
    })
    
})

module.exports = router