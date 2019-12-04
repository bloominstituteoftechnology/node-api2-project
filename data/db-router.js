const express = require('express');

const Posts = require('./db');

const router = express.Router();

router.use(express.json());

//GET requests

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log('error on GET/api/posts', error);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
    .then(posts => {
        posts ? res.status(200).json(posts) :
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(error => {
        console.log('error from GET/:id', error);
        res.status(500).json({ error: "The post information could not be retrieved." })
    });
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comment => {
        !comment ? res.status(500).json({ message: "The post with the specified ID does not exist." }) : res.status(200).json(comment);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

//POST requests

router.post('/', (req, res) => {
    const {title, contents} = Posts.insert(req.body)
    .then(posts => {
       title || contents  ?
            res.status(400).json({ errorMessage: "Please provide title and contents for the post."}) : res.status(201).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    });

});

router.post("/:id/comments", (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    if (text) {
    Posts.findById(id)
    .then(post => {
        if (post.length) {
        Posts.insertComment({ text: text, post_id: id })
            .then(() => {
            res.status(201).json({ message: req.body });
            })
            .catch(err => {
            console.log(err);
            res.status(500).json({
                error:
                "There was an error while saving the comment to the database."
            });
            });
        } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        error: "There was an error while saving the comment to the database."
        });
    });
} else {
    res
    .status(400)
    .json({ errorMessage: "Please provide text for the comment." });
}
});

//DELETE request

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        count > 0 ? res.status(200).json({ message: 'post successfully deleted' }) : res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" })
    })
})

//PUT request

router.put('/:id', (req, res) => {
    const updates = req.body;
    const id = req.params.id;
    Posts.findById(id)
    .then(changes => {
        if( changes ) {
            res.status(201).json(changes);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        };
        if (!updates.text) {
            Posts.update(id, updates)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                console.log('error on PUT/:id', err);
                res.status(400).json({ errorMessage: "Please provide text for the comment."});
            });
        } else if (!user.id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment."});
        }
    })
    .catch(error => {
        console.log('error from PUT/:id', error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

module.exports = router;