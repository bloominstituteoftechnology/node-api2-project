const express = require('express')
const Blog = require('./db.js');
const { findById } = require('./db.js');

const router = express.Router();

//-------------------------------------------------------------------------------------------------------//
//GET

router.get('/', (req, res) => {
    Blog.find(req.query)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the blog',
      });
    });
  });

router.get('/:id', (req, res) =>  {
    Blog.findById(req.params.id)
    .then(blog => {
        if(blog.length) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})  

router.get('/:id/comments', (req, res) => {
    Blog.findPostComments(req.params.id)
    .then(blog => {
        if(blog.length > 0) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})


//-------------------------------------------------------------------------------------------------------//
//POST

router.post('/', (req, res) => {
    Blog.insert(req.body)
    .then(blog => {
        if(req.body.title && req.body.contents) {
            res.status(201).json(blog);
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }) 
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    Blog.update(id, changes)
    .then(blog => {
        if (blog) {
            if (changes.title && changes.contents) {
                res.status(200).json(changes);
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
        }
         else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

//-------------------------------------------------------------------------------------------------------//
// DELETE



router.delete('/:id', (req, res) => {
    const id = req.params.id
    const post =
        Blog.findById(id)
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json(error)
    );
    Blog.remove(id)
    .then(blog => {
        if(blog > 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.post('/:id/comments', (req, res) => {
    var comment = req.body;
    comment.post_id = req.params.id;

    Blog.insertComment(comment)
    .then(blog => {
        if(blog) {
            if(comment.text) {
                res.status(201).json(comment);
            } else {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            }
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }) 
})

module.exports = router;