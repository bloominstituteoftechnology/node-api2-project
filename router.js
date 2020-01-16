const express = require('express');

const router = express.Router();

router.use(express.json());

const db = require('./data/db');

router.post('/posts', (req, res) => {
    if(req.body.title.length<1 || req.body.contents.length<1 ){
        res.status(400).json({errorMessage: "Please provide title and contents for the post." }); 
    } else{
      db.insert(req.body)
    .then(hubs => {
      res.status(201).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });  
    }
    
  });

router.post('/posts/:id/comments', (req, res) => {
    console.log(req.body.text)
    console.log(req.params.id)
    const { text } = req.body
    const post_id = req.params.id;

    db.findById(req.params.id)
        .then(post => {
           if(!post[0]) {
            res.status(404).json({message: "The post with the specified ID does not exist." });
           } 
        })

        if(text.length<1){
            res.status(400).json({errorMessage: "Please provide text for the comment." });
        } else {
            db.insertComment({text, post_id})
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    }); 
}
    


    
    
  });


router.get('/posts', (req, res) => {
    db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
  });

router.get('/posts/:id', (req, res) => {
    db.findById(req.params.id)
    .then(hubs => {

        if(!hubs[0]){
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }else{
          res.status(200).json(hubs);  
        }
      
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved." ,
      });
    });
  });

router.get('/posts/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(hubs => {
        if(!hubs[0]){
        res.status(404).json({message: "The post with the specified ID does not exist."}); 
        }
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved." ,
      });
    });
  });

router.delete('/posts/:id', (req, res) => {
    db.remove(req.params.id)
    .then(hubs => {
        if(!hubs){
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
  });

router.put('/posts/:id', (req, res) => {
    db.update(req.params.id, req.body)
    .then(hubs => {
        if(!hubs){
            res.status(404).json({message: "The post with the specified ID does not exist." })
        } else if (req.body.title.length<1 || req.body.contents.length<1 ){
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        }
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
  });






module.exports = router;