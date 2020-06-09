const express = require('express')
const db = require('../data/db')

const router = express.Router()

//posts routes
router.get('/posts', (req, res) => {
    db.find()
      .then(post => {
          res.status(200).json(post)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved.",
        })
    })
})

router.get('/posts/:id', (req, res) => {
    db.findById(req.params.id)
      .then(post => {
          if(post){
            res.status(200).json(post)
          }else {
              res.status(404).json({
                  message: 'The post with the specified ID does not exist.'
              })
          }
      }) 
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the users",
        })
    })
})


router.post('/posts', (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(404).json({
            message: 'Please provide title and contents for the post.'
        })
    }
    db.insert(req.body)
      .then(post => {
          res.status(201).json(post)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
        })
    }) 
})

router.put('/posts/:id', (req, res) => {
     if(!req.body.title || !req.body.contents) {
          return res.status(404).json({
              message: 'Please provide title and contents for the post.'
          })
     }

     db.update(req.params.id, req.body)
       .then(post => {
           if(post) {
             res.status(200).json(post) 
           } else {
               res.status(404).json({
                   message: 'The post with the specified ID does not exist.'
               })
           } 
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: 'The post information could not be modified.',
            })
        })  
})

router.delete('/posts/:id', (req, res) => {
    db.remove(req.params.id)
      .then(post => {
          if(post > 0) {
             res.status(200).json({
                 message: 'The post has been removed'
             }) 
          } else {
              res.status(404).json({
                  message: 'The post with the specified ID does not exist.'
              })
          }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'The post could not be removed',
        })
    })   
})

//comments routes 

router.get('/posts/:id/comments', (req, res) => {
    db.findById(req.params.id)
      .then(post => {
         if(!post) {
             res.status(404).json({
                 message: 'The post with the specified ID does not exist'
             })
         } else {
             return db.findPostComments(req.params.id)
         }
      })
      .then(comm => {
          res.json(comm)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'The comments information could not be retrieved.',
        })
      })
})

router.get('/posts/:id/comments/:commentId', (req, res) => {
    db.findCommentById(req.params.commentId)
      .then(comm => {
          if(comm) {
              res.json(comm)
          } else {
              res.status(404).json({
                  message: 'The comment with the specified ID does not exist.'
              })
          }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'The comments information could not be retrieved.',
        })
      })
})

router.post('/posts/:id/comments', (req, res) => {
    if(!req.body.text) {
        return res.status(400).json({
            message: 'Please provide text for the comment.'
        })
    }
    db.insertComment({...req.body, post_id: req.params.id})
     .then(comm => {
         res.status(201).json(comm)
     })
     .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: 'The comments information could not be retrieved.',
            error: error.message 
        })
      })
})


module.exports = router
