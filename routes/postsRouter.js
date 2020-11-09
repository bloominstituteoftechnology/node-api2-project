const router = require('express').Router();
const e = require('express');
const postDB = require('../data/db')
// postDB.findCommentById(9).then(ar=>{
//     console.log(ar)
// });
router.get('/', (req, res)=>{
    postDB.find()
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

router.get('/:id', (req, res)=>{
    postDB.findById(req.params.id)
    .then(data => {
        if (data.length > 0){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    });
});

router.get('/:id/comments', (req, res)=>{
    postDB.findPostComments(req.params.id)
    .then(data => {
        if (data.length>0){
            res.status(200).json(data)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
});

router.post('/', (req, res)=>{
    // const post = req.body;
    if ((!req.body['title'] || !req.body['contents']) || (req.body.title == '' || req.body.contents == '')) {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
    }
    postDB.insert(req.body)
    .then(data => {
        res.status(201).json(req.body);
    })
    .catch(err =>{
        res.status(500).json({ error: 'There was an error while saving the post to the database'});
    });
});

router.post('/:id/comments', (req, res)=>{
    const id = req.params.id;
    const comment = req.body;
    // console.log(typeof(req.body))
    postDB.findById(id)
    .then(postList => {
        if(!comment['text'] || comment.text == ""){
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
            return;
        }
        if(postList.length < 1){
            res.status(404).json({ message: "The post with the specified ID does not exist." });
            return;
        }
        console.log("validated")
    })
    .catch(er => {
        res.status(500).json({ error: "There was an error while locating the comment in the database", err: er });
    });

    postDB.insertComment(comment)
    .then(r => {
        // id = r.id
        res.status(201).json(comment)
    })
    .catch(er => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
        return;
    });
});

router.put('/:id', (req, res)=>{
    pass
});

router.delete('/:id', (req, res)=>{
    postDB.findById(req.params.id)
    .then(data => {
        if(data.length < 1 ){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
            return
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error orrured while searching database for post"})
        return
    })
    postDB.remove(req.params.id)
    .then(data => {
        res.status(200).json({message: "error orrured while searching database for post"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "error orrured while searching database for post"})
    })
});

module.exports = router;