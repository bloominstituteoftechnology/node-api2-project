const express = require("express")
const router = express.Router()
const posts = require("../data/db")

// ADD POST
router.post("/", (req,res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing title or contents",
		})
	}

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding new post",
			})
		})
})

// ADD COMMENT
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = {...req.body, post_id: req.params.id };
    if (!req.params.id) {
        res
            .status(404)
            .json({ message: 'ID not found' });
   } else if (!req.body.text) {
        res
           .status(400)
           .json({ errorMessage: 'Please provide text.' });
    } else {
        posts.insertComment(comment)
            .then(comment => {
                res.status(201).json(comment);
           })
            .catch(error => {
                console.log('Error: ', error);
               res.status(500).json({
                    error: 'Cannot save comment'
                });
            });
    }
});

// RETURN POST
router.get("/", (req, res) => {
    posts.find()
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
		res.status(500).json({
			message: "Error retrieving posts",
			})
		})
})

// RETURN POST BY ID
router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((posts) => {
            res.status(200).json(posts)
       })
        .catch((error) => {
            console.log(error)
			res.status(500).json({
				message: "Error retrieving post",
			})
        })
})

// RETURN POST COMMENTS
router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error getting comments"
            })
       })
})

// DELETE POST
router.delete("/:id", (req, res) => {
    posts.remove(req.params.id)
    .then((count) => {
            if (count > 0) {
               res.status(200).json({
                  message: "post deleted",
                })
            } else {
                res.status(404).json({
                    message: "The user could not be found",
                })
        }})
       .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the user",
            })
      })
})

// UPDATE POST
router.put("/:id", (req, res) => {
    posts.update(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
					message: "The post could not be found",
				})
            }
       })
        .catch()
})

module.exports = router