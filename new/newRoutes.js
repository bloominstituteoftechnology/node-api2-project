const express = require('express')
const router = express.Router()
const Notes = require('../data/db');


router.use(express.json());

//GET	/api/posts	Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
    Notes.find()
    .then(note => {
        res
            .status(200)
            .json(note)
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ error: "The posts information could not be retrieved." })
    })
})

//GET	/api/posts/:id	Returns the post object with the specified id.
router.get('/:id', (req, res) => {
    const id = req.params.id
    Notes.findById(id)
    .then(note => {
        if(note.length !== 0){
        res.status(200)
        .json(note)
        }else{
            res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error)
        res
            .status(404)
            .json({ message: "The post information could not be retrieved." })

    })
})


// GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Notes.findPostComments(id)
    .then(note => {
        if(note.length !== 0){
            res
                .status(200)
                .json(note)
        } else {
            res
                .status(404)
                .json({ error: "The post information could not be retrieved." });
        
        }
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ error: "The comments information could not be retrieved." });
  
    })
})

module.exports=router