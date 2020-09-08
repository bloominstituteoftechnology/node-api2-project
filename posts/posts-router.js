const express = require('express');
const db = require('../data/db');
const router = express.Router();
router.use(express.json());



router.post('/', async (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) {
        res.status(400).json({ message: "Please provide title and contents for this post."});
    } else {
        try {
            const newPost = await db.insert(post);
            res.status(201).json({...newPost, ...post});
        }
            catch(error) {
                console.log(error);
                res.status(500).json({ error: "There was an error while saving the post to the database."})
            }
    }
});

router.post('/id/comments', async (req, res) => {
    const {id} = req.params;
    const comment = req.body;
    console.log(comment.length);
    if (comment) {
        try {
            const post = await db.findById(id);
            if(post.length > 0) {
                const newComment = await db.insertComment(comment);
                res.status(201).json({...newComment, ...comment});
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."});
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "There was an error while saving the ccomment to the database."
            });
        }
    } else {
        res.status(400).json({message: "Please provide text for the comment."});
    }
});

router.get('/', (req, res) => {
    db.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({
                error: "The posts information could not be retrieved.",
                err
            })
        })
});

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        post
            ? res.status(200).json(post)
            : res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
    })
    .catch((err) => {
        res.status(500).json({
            error: "The post information could not be retrieved.",
            err
        })
    })
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(req.params.id)

    .then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments);
        } else {
            res.status(500).json({
                message: "The comments information could not be retrieved."
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "The post with the specified ID does not exist."})
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
	const post = await db.findById(id);
	if (post.length > 0) {
		try {
			const deleted = await db.remove(id);
			res.status(200).json(post);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'The post could not be removed' });
		}
	} else {
		res
			.status(404)
			.json({ message: 'The post with the specified ID does not exist.' });
	}
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
	const body = req.body;
	if (!body.title || !body.contents) {
		res
			.status(400)
			.json({ message: 'Please provide title and contents for the post.' });
	} else {
		const post = await db.findById(id);
		if (post.length > 0) {
			try {
				const updatedPost = await db.update(id, body);
				const post = await db.findById(id);
				res.status(200).json(post);
			} catch (error) {
				console.log(error);
				res
					.status(500)
					.json({ message: 'The post information could not be modified.' });
			}
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	}
})



module.exports = router;