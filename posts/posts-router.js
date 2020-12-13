const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Please provide title and contents for the post.",
		})
	}

	db.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: "There was an error while saving the post to the database",
			})
		})
})

router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const comment = {...req.body, post_id: req.params.id };
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist." 
        })
    } else if (!req.body.text) {
        res.status(400).json({ 
            errorMessage: "Please provide text for the comment." 
        })
    } else {
        db.insertComment(comment)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                })
            })
    }
})

router.get("/", (req, res) => {
    db.find(req.params)
    .then((posts) => {
        res.json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist." ,
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: "The post information could not be retrieved.",
			})
		})
})

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
        .then((comments) => {
            if (comments) {
                res.json(comments)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            }
           
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error getting comments"
            })
        })
}) 

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
            res.status(200).json({
                message: "The post has been deleted",
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist.",
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post could not be removed",
        }) 
    })
})

router.put("/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: "Please provide title and contents for the post.",
		})
	}

	db.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
                error: "The post information could not be modified." ,
			})
		})
})

module.exports = router