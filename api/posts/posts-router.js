// implement your posts router here
let router = require('express').Router()
const Posts = require('./posts-model');

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        messsage: "The posts information could not be retrieved"
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist", 
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content){
      res.status(500).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const newPost = await Posts.insert(req.body);
      res.status(201).json(newPost);
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});


module.exports = router;