const express = require("express");
const Posts = require("./posts-model");
const router = express.Router();

// [GET] /api/posts
router.get('/', (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

// [GET] /api/posts/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

// [POST] /api/posts
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else if (!title.trim() || !contents.trim()){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.insert(req.body)
        .then(newPostId => {
            res.status(201).json({ id: newPostId.id, title: title, contents: contents});
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
    }
    
});

// [PUT] /api/posts/:id
// Updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
    if(!changes.title || !changes.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else if (!changes.title.trim() || !changes.contents.trim()){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.update(parseInt(id), changes)
        res.status(200).json(changes);
    }
})

// [DELETE] /api/posts/:id
// Removes the post with the specified id and returns the deleted post object

// [GET] /api/posts/:id/comments
// Returns an array of all the comment objects associated with the post with the specified id

module.exports = router;
