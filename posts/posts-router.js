const express = require('express');
const data = require('../data/db.js');
const router = express.Router();

router.get('/', (req, res) => {
    data.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    data.findCommentById(id)
    .then(response => {
        if (response.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        else {
            res.status(200).json(response);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    data.findPostComments(id)
    .then(response => {
        if (response.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else {
            res.status(200).json(response);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    data.findById(id)
    .then(resp => {
        if (resp.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        data.remove(id)
        .then(response => {
            res.status(200).json({
                message: "Post deleted."
            })
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }

    data.findById(id)
    .then(response => {
        if (response.length === 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        data.update(id, req.body)
        .then(resp => {
            // console.log(resp);
            data.findById(id)
            .then(r => {
                res.status(200).json(r);
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "The post information could not be modified." })
        })
    })
})

router.post('/', (req, res) => {

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    const { title, contents } = req.body;
    data.insert(req.body)
    .then(response => {
        data.findById(response.id)
        .then(resp => {
            res.status(201).json(resp);
        })
        .catch(err => console.log(err.response));
    })
    .catch(err => {
        console.log(err.response);
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    const id  = req.params.id;

    data.findById(id)
    .then(resp => {
        if (resp.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })

    if (!req.body.text) {
        return res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }

    data.insertComment({ post_id: id, text: text})
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})


module.exports = router;