const express = require("express")


// create new stand alone express router
const router = express.Router()
const posts = require("../data/db")

// ADD POSTS
router.post("/api/posts", (req,res) => {
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

// ADD COMMENTS
router.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = {...req.body, post_id: id };
    if (!id) {
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


// RETURN POSTS
router.get("/api/posts", (req, res) => {
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
router.get("/api/posts/:id", (req, res) => {
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
router.get("/api/posts/:id/comments", (req, res) => {
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

// UPDATE POST

module.exports = router