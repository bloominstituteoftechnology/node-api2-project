// implement your posts router here
const Posts = require('./posts-model')
const express = require('express')
const { post, route } = require('../server')
const router = express.Router()

router.get('/', (req, res) => {
    Posts.find()
         .then(post => {
             res.status(200).json(post)
         })
         .catch(err => {
             console.log(err)
             res.status(500).json({message: "The posts information could not be retrieved"})
         })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
         .then(post => {
           if (post)  {
               res.status(200).json(post)
            } else { 
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
         })
         .catch( err => {
             console.log(err)
             res.status(500).json({message: 'Error Finding posts'})
         })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
         .then(post => {
             res.status(201).json(post)
         })
         .catch(err => {
             console.log(err)
             res.status(500).json({ message: "The post information could not be retrieved"})
         })
})

// router.delete('/:id', (req, res) => {
//     Posts.remove(req.params.id)
//          .then()
// }) 

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const changes = req.body  

  try{
      if (!changes.title || !changes.contents){
       res.status(400).json({message: "Please provide title and contents for the post"})
  } else{
      const updateInfo = await Posts.update(id, changes)
      if(!updateInfo){
          res.status(404).json({ message: "The post with the specified ID does not exist"})
      } else{
          res.status(200).json(updateInfo)
      }
  }
  const updateInfo = await Posts.update(id, changes)
      res.status(200).json(updateInfo)
     
}
catch(err){
    res.status(500).json({message:err.message})
}
})


router.delete('/:id', async (req, res) => {
  try{ 
    const idR = res.params.id
    const postDelete = await Posts.remove(idR)
    if(!postDelete){
        res.status(404).json({message:'Not Found'})
    }else{
        res.status(200).json(postDelete)
    } 
}catch(err){
        res.status(500).json({message:'The post could not be removed'})
    }

})

router.get('/:id', (req, res) => {
    Posts.findPostComments(req.params.id)
         .then(post => {
           if (post)  {
               res.status(200).json(post)
            } else { 
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
         })
         .catch( err => {
             console.log(err)
             res.status(500).json({message: 'Error Finding posts'})
         })
})
module.exports = router