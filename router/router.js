const express = require("express");
const Database = require("../data/db.js");
const router = express.Router();


router.post("/", (req, res) => {
    Database.insert(req.body)
        .then(db => {
            res.status(201).json({message: `A post with id ${db.id} is added to the posts.`});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "There was an error while saving the post to the database"});
        });
});

router.post("/:id/comments", (req, res) => {
    Database.insertComment(req.body)
        .then(db => {
            res.status(201).json({message: `A comment with id ${db.id} is added to a post with id ${req.params.id}.`});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "There was an error while saving the comment to the database"});
        });
});

router.get("/", (req, res) => {
    Database.find()
        .then(db => {
            res.status(200).json(db);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The posts information could not be retrieved."})
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    Database.findById(id)
        .then(db => {
            if(!db){
                return res.status(404).json({message: "The post with the specified ID does not exist."});
            } else{
                return res.status(200).json(db)
            };
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The post information could not be retrieved."})
        });
});

router.get("/:id/comments", (req, res) => {
    Database.findPostComments(req.params.id)
        .then(db => {
            if(!db){
                return res.status(404).json({message: "The post with the specified ID does not exist."});
            } else {
                return res.status(200).json(db);
            };
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The comment information could not be retrieved."})
        });
});

router.delete("/:id", (req, res) => {
    Database.remove(req.params.id)
        .then(db => {
            res.status(204).end();
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The post could not be removed"});
        });
});

router.put("/:id", (req, res) => {
    Database.update(req.params.id, req.body)
        .then(db => {
            res.status(200).json({message: `${db} post is updated.` });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The post information could not be modified"});
        });
});

module.exports = router;