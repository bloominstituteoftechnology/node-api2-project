const express = require('express');
const Hubs = require("../data/db");

const router = express.Router();

// router.get('/', (req, res) => {
//   console.log(req.query)
//   res.send(`The '/api/posts' API`);
// });

router.get('/', (req, res) => {
  Hubs.find(req.query)  
      .then(posts => res.json(posts))
      .catch(error => {
          res.json(500).json({
            error: "The posts information could not be retrieved.", 
          })
      })
})

module.exports = router;

router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
      .then(post => {
        if(post) {
          res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.json(500).json({
          error: "The posts information could not be retrieved.", 
        })
      })
})

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if(!title || !contents) {
    return escape.status(400).json({
      errorMessage: "Please provide title and contents for the post.", 
    })
  }
  Hubs.insert({ title, contents })
      .then(res => Hubs.findById(res.id))
      .then(post => res.status(201).json(post))
      .catch(error => {
        res.json(500).json({
          error: "There was an error while saving the post to the database", 
        })
      })
})

router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been deleted' });
          // .then(post => {
          //    if(post) {
          //    return res.status(204).end()
        } else {
            res.status(404).json({ 
              message: "The post with the specified ID does not exist." 
          })
        }
      })
      .catch(error => {
        res.json(500).json({
          error: "The post could not be removed", 
        })
      })
})

router.put('/:id', (req, res) => {
  const { title, contents } = req.body;
  if(!title || !contents) {
    return res.status(400).json({
      message: "Please provide title and contents for the post.", 
    })
  }
  Hubs.update(req.params.id, { title, contents })
      .then(post => {
        if(post) {
            res.json(post)
        } else {
            res.status(404).json({ 
              message: "The post with the specified ID doen not exist.",
            })
        }
      })
      .catch(error => {
        res.json(500).json({
          error: "The post information could not be modified.", 
        })
      })
})

router.get('/:id/comments', (req, res) => {
  Hubs.findPostComments(req.params.id) 
      .then(comments => {
        res.json(comments)
      })
      .catch (error => {
        res.json(500).json({
          error: "The comments information could not be retrieved.", 
        })
      })
})