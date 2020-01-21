const express = require("express");
const router = express.Router();
const data = require("../data/db");

router.get("/", (req, res) => {
  res.status(200).send("hello from the post route");
});

// When the client makes a POST request to /api/posts: CREATE
router.post("/", (req, res) => {
  const body = req.body;
  data.insert(body)
  if(body.title || body.contents != true){
    res.status(400).json({error: 'Please provide title and contents for the post.'})
  } else {
      data.insert(body)
      .then((complete) => {
        res.status(201).json(complete)
      }) .catch(err=>{
        console.log(err)
        res.status(500).json({error: "There was an error while saving the post to the database", error:err})
    })
  }
});


  // When the client makes a GET request to /api/posts:
  router.get('/', (req, res) => {
    data.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: "The posts information could not be retrieved.", error:err});
    })
  });

  // When the client makes a GET request to /api/posts/:id:
  router.get('/:id', (req, res) => {
    data.findById(req.params.id)
    .then(user => {
      if(user){
        res.status(200).json({success:true, user})
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500).json({error: "The post information could not be retrieved.", error:err});
    })
  });

  // When the client makes a DELETE request to /api/posts/:id:
  router.delete('/:id', (req, res) => {
    data.remove(req.params.id)
    .then(rmuser => {
      if (rmuser){
        res.status(200).json({success:true, rmuser})
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed", err }))
  });



module.exports = router;
