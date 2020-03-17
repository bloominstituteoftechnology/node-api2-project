const posts = require("./data/db");
const express = require ("express");
const router = express.Router();

router.get('/', (req, res) =>{
    posts.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err =>{
        res.status(500).json({message: "server error"})
    })
})
router.post("/", (req, res)=>{
    console.log(req.body)
    const {title, contents}= req.body;
    !title || !contents
    ? res.status(400).json({ message: "Please provide title and contents"})
    :posts.insert(req.body)
    .then(posts =>{
        res.status(201).json(req.body);
    })
    .catch(err =>{
        res.status(500).json({message: "server error on post"})
    })
})
router.post("/id", (req, res)=>{
    const {id}= req.params
    console.log(req.body)
    posts.findPostComments(req.body)
    .then(posts =>{
        res.status(201).json(posts)
    })
    .catch(err =>{
        res.status(500).json({message: "server error on post"})
    })
})
router.delete('/:id', (req, res)=>{
    const{id}= req.params
    posts.remove(id)
    .then(deleted =>{
        if (deleted){
            res.status(200).json({message: `Post was deleted`, deleted})
        } else {
            res.status(404).json({message:`The post specified id does not exist`})
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "Server error"})
    })
})
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const { title, contents } = req.body;
  
    !title || !contents // either or - if one of them is missing, err
    ? res.status(400).json({ errorMessage: "Please provide title and contents for the post." }) // Bad Request response - Worked on postman
  
    : posts
      .update(changes, id)
      .then(updated => {
        if (updated) {
          res.status(200).json({ message: "Successfully Updated", changes });
        } else {
          res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist.",
            });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." }); 
      });
  });
  router.post("/:id/comments", (req, res) => {
    const { text } = req.body; // pulling out one piece out of the db.js
    const post_id = req.params.id; // this dynamic id from above is going to come from the URL - params
  
    !text ? // Not Text? 
        res.status(400).json({ errorMessage: "Please provide text for the comment." }) // if the request body is missing the text property (Bad Request) - worked on postman
    : posts.findById(post_id) // : else
      .then(post => {
        if (!post) { res.status(404).json({ error: "The post with the specified ID does not exist." }) // working on postman
      } else {
        let newComment = {
          text: text, post_id: post_id
        }
        posts.insertComment(newComment) // saves the new comment to the db
          .then(({ id }) => {
        posts.findCommentById(id)
          .then(comment => {
            res.status(201).json(comment) // If the info re: comment is valid, save the new comment to the db - worked on postman
        });
      }) // add your if (!text) conditional to the top of the .catch block
      .catch(err => {
        console.log(error);
        res.status(500).json({ errorMessage: "There was an error while saving the comment to the database"
          })
        })
      } // POST request is possible to do 500 error on postman
    })
  });
  router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    posts
      .findPostComments(id)
      .then(data => { // 200 response working on postman
        data ? res.status(200).json(data) : res.status(404).json({ message: 'The Post ID Does NOT Exist.' }) // 404 working on postman
      }) // If there's data, return 200. If not, return 404
      .catch(err => {
        res.status(500).json({
          message: 'The comments information could not be retrieved.',
        })
      })
  })

module.exports = router