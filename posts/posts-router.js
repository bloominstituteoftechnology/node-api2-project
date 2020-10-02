const express = require('express');
const posts = require('../data/db');
const router = express.Router();


//get posts
router.get("/posts", (req, res) => {
  posts
  .find(req.query)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({
      message: "Error retrieving posts"
    })
  })
}
);

//get posts by is
router.get("/posts/:id", (req, res) => {
  posts
  .findById(req.params.id)
  .then((post) => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "Post not found",
      });
    }
  })
      .catch((error) => {
        res.status(500).json({
          message: "Error retrieving post",
        });
      });
    
   
  
});

//create new post
router.post("/posts", (req, res) => {
  if(!req.body.title || !req.body.contents ) {
    return res.status(400).json({
      message: "Missing title or contents",
    });
  }

posts
.insert(req.body)
.then((post) => {
  res.status(201).json(post);
})
.catch((error) => {
  res.status(500).json({
    message: "Error adding post",
  });
});

});


module.exports = router;