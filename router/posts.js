const router = require("express").Router();

const DB = require('../data/db')

//GET METHODS
router.get('/', (req, res) => {
    const query = req.query
    DB.find(query)
    .then(db => {
        console.log(res)
        res.status(200).json({ data: db, parameters: req.query})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    });
})

router.get('/:id', (req, res) =>{ 
    DB.findById(req.params.id)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        } else {
            res.status(404).json({message: 'db not found'})
        }
    })
})

router.get('/:id/comments', (req, res) => {
    DB.findCommentById(req.params.id)
    .then(comment => {
        if(comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({message: 'db not found'})
        }
    })
})

//DELETE METHOD
router.delete('/:id', (req, res) => {
    DB.remove(req.params.id)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        } else {
            res.status(404).json({message: 'db not found'})
        }
    })
})

//POST METHODS
router.post('/', (req, res)=>{
    DB.insert(req.body)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        } else {
            res.status(404).json({message: 'db not found'})
        }
    })
}) 

router.post('/:id/comments', (req, res)=>{
    const body = req.body;
    const id = req.params.id
    console.log(id)
if(body.text.length) {
        DB.insertComment(body)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(err => {
                res.statis(500).json({message: 'oops I did it again - bspears'})
            })
        } else { res.status(400).json({message: 'db not found'})

    }
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id
    if(changes){    
        DB.update(id, changes)
        .then(db => {
            res.status(200).json(db)
        })
        .catch(err => {
            res.statis(500).json({message: 'oops I did it again - bspears'})
        })
    } else {
        res.status(400).json({message: 'db not found'})
    }
})

module.exports = router;