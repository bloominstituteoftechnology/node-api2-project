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

//POST	/api/posts	Creates a post using the information sent inside the request body.
router.post ('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !content){
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Notes.insert(req.body)
        .then(note => {
            res
                .status(201)
                .json({note})
        })
        .catch(error => {
            console.log(error)
            res
                .status(500)
                .json({ error: "There was an error while saving the post to the database" })
        })
    }
})
// POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.

router.post('/:id/comments', (req, res) => {
    const { text } = req.body
    if (!text) {
        res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
    } else {
        Notes.findById(req.params.id)
        .then(note => {
            if(note.length > 0){
                Notes.insertComment(req.body)
                .then(response =>{
                    Notes.findCommentById(response.id)
                    .then(newCom =>{
                        res
                        .status(201).
                        json({newCom});
                    })
                })
            }else{
                res
                    .status(404)
                    .json({errorMessage: "Unable to find the post specified!"});
            }
        }).catch(error => {
            res
                .status(500)
                .json({ error, message: "Unexpected error has occurred." });
        });
    }
})

router.delete('/api/posts/:id', (req,res) => {
    Notes.findById(req.params.id)
    .then(note => {
        if(note.length > 0){
            Notes.remove(req.params.id)
            .then(gone => {
                if(gone > 0){
                res
                .status(200)
                .json({message: `Success ${gone} and ${req.params.id}`})
                }
            })
        } else {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error)
        res
            .status(500)
            .json({ error: "The post information could not be modified." })
    })
})
// When the client makes a PUT request to /api/posts/:id:

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.

router.put('/:id', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
        Notes.update(req.params.id, req.body)
        .then(note => {
            if(note){
            res
                .status(200)
                .json({post})
            } else {
                res
                    .status(404)
                    .json({  message: "The post with the specified ID does not exist." })
            }
            })
        .catch(error => {
            console.log(error)
            res
                .status(500)
                .json({ error: "The post information could not be modified."})
        })
    }
})

module.exports=router