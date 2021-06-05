// implement your posts router here
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

// POSTS ENDPOINTS
router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log("error",error)
            res.status(500).json({
                message: 'Error retrieving the posts.',
            });
        });
}); 

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
});

router.post('/', (req, res) => {

    // missing required params
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" });
        return
    }

    Post.insert(req.body)
        .then(post => {
            if (post) { // post = {"id": 21}
                // console.log("post", post.id) // 21
                // this is a workaround because the post we get back from insert, is not a full post, it only has an id
                Post.findById(post.id)
                .then(post => {
                    res.status(201).json(post)
                })

            } else {
                res.status(400).json({ message: "Please provide title and contents for the post" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message:  "There was an error while saving the post to the database",
            });
        });
});


router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    // missing required params
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" });
        return
    }

    Post.update(id, changes)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
                return Post.findById(id)
            }
        })
        .then((post => res.status(200).json(post)))
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" })
        }) 

});



router.delete('/:id', (req, res) => {

    Post.findById(req.params.id)
        .then(post => {
            if (post) {

                Post.remove(req.params.id)
                    .then((response) => {
                        res.status(200).json(post);
                    })

            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The post could not be removed" })
        })
});


router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    Post.findById(id)
        .then((post) => {
            if (post) {
                
                Post.findPostComments(req.params.id)
                    .then((comments) => {
                    
                        res.status(200).json(comments)
                    
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ message: "The comments information could not be retrieved" })
                    })
        

            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
  
});
});

module.exports = router;