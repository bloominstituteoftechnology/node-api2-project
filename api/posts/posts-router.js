const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

const DB = require('../db-helpers');
const { post, route } = require('../server');

const errorMessage = 'The post with the specficied id does not exist'

// POST 
router.post("/", (req,res)=>{
    const newPost = req.body;

    // Ensure that the title or contents are specified
  if (
    newPost.title === undefined ||
    newPost.title === "" ||
    newPost.contents === undefined ||
    newPost.contents === ""
  ) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
    return;
  }

  DB.insert(newPost)
    .then((post) => {
      res.status(201).json({ ...post, ...newPost });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});


module.exports = router;