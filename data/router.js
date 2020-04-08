const express = require("express");
const posts = require('./db');
const router = express.Router();




//Add POST
router.post('/', (req, res) => {
    const {title, contents} = req.body
    !title || !contents
    ? res.status(400).json({message: 'Provide title and contents'})
    :posts.insert(posts => {
        res.status(201).json(req.body);
    }) .catch(error => {
        res.status(500).json({errorMessage: 'error'})
    })
})

     

router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    posts.findPostComments(id)
        .then(comments => {
            res.status(201).json(comments)
            })
        .catch(error=> {
        res.status(500).json({ errorMessage: 'comment could not be recived'})
        })
    })

    //GETS all post
    router.get('/', (req, res) => {
        posts.find() 
        .then(posts => {
            res.status(200).json(posts)
        }) .catch(error => {
            res.status(500).json({message: 'error'})
        })
    })

    //GETS post with id
    router.get('/:id', (req, res) => {
        const {id} = req.params;
        posts.findById(id)
        .then(posts => {
            if(posts.length > 0){
            res.status(200).json(posts)
        } else {
            res.status(404).json({error: 'the post does not exist'})
        }
    }) .catch( error => {
        res.status(500).json({error:"info not recived"})
    })
})

//GET request by id
router.get('/', (req, res) => {
    const {id} = req.params;
    posts.findCommentById(id)
    .then(comment => {
        if (comment.length>0) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({error: 'error'})
        }
    }) .catch(error=> {
        res.status(500).json({error: 'error'})
    })
})

//GET post 
router.get('/', (req, res) => {
    post.find()
    .then(posts => {
        res.status(200).json(posts)
    }).catch(error => {
        res.status(500).json({message: 'error'})
    })
})

router.put('/:id', (req, res) => {
    const {id}=req.params;
    const body = req.body;
    posts.findById(id)
    .then(postid => {
        if(!postid.length) {
            res.status(404).json({message:'Does not exist'})
        }
        else if (!body.title || !body.contnets){
            res.status(400).json({message: 'Error'})
        } else if (body.title && body.contents) {
            posts.update(id, body) 
            .then(put => {
                res.status(200).json(body)
            })
            .catch(error => {
                res.status(500).json({message: "error"})
            })
        }
    })
})

//DELETE
router.delete('/:id', (req, res)=>{
    const{id}= req.params
    posts.remove(id)
    .then(deleted =>{
        if (deleted){
            res.status(200).json({message: `Post was deleted`, deleted})
        } else {
            res.status(404).json({message:`error`})
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "error"})
    })
})

module.exports = router;

