const express = require("express");
const router = express.Router();
const Posts = require("./data/db.js");

// ******************* GET REQUESTS ****************************************
router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json({query: req.query, data: posts});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
});

// ******************* POST REQUESTS ****************************************

router.post("/", (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        });
    });
});

router.post('/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch( error => {
        console.log("New post error", error);
        res.status(500).json({ errorMessage: "Please provide text for the comment." });
    });
});


// ******************* PUT REQUESTS ****************************************

router.put("/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Please provide title and contents for the post." })
    })
})



// ******************* DELETE REQUESTS ****************************************

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The Post has been nuked!"});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    });
});




module.exports = router;