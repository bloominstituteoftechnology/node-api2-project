// implement your posts router here
const express = require('express');

const router = express.Router();

const Post = require('./post-model');

router.get('/', (req, res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Couldn't get that one, try again"
        })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(singlePost => {
        if (singlePost){
            res.status(200).json(singlePost)
        } else {
            res.status(404).json({
                message: "That resource doesn't exist, sorry"
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message:"Couldn't grab that post info, sorry"
        })
        }
    )
})

router.get('/:id/comments', (res, res) => {
    Post.findPostComments(req.params.id)
    .then(comment => {
        if(comment){
            res.status(200).json(comment)
        } else {
            res.status(404).json({
                message: "Ze post with ze spezefied id doez not exizt"
            })
        }
    }
    )
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Ze comments info couldn't be retrieved"
        })
    })
})

router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: "Pls provide the title and contents for the post"
        })
    } else {
        Post.insert(req.body)
        .then(onePost => {
            res.status(201).json(onePost)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "That be an error while saving"
            })
        })
    }
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
    .then(thisPost => {
        if(!changes.title || !changes.contents){
            res.status(400).json({
                message: 'Pls provide title and contents for ze post'
            })
        } else if(thisPost){
            res.status(200).json({
                message: "The post with the ID you specified doesn't exist"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Ze post info couldn' tbe modified, sorry"
        })
    })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(anotherPost => {
        if(!anotherPost){
            res.status(404).json({
                message: "e post with the specifized ID doezn't exizt"
            })
        } else {
            res.json(anotherPost)
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "The post couldn't be removed, sorry"
        })
    })
})