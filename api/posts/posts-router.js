// implement your posts router here
let router = require('express').Router()
const { restart } = require('nodemon');
const Posts = require('./posts-model');

// 1 	GET 	/api/posts 	Returns an array of all the post objects contained in the database
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

// 2 	GET 	/api/posts/:id 	Returns the post object with the specified id
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

// 3 	POST 	/api/posts 	Creates a post using the information sent inside the request body and returns the newly created post object
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content){
      res.status(400).json({
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

// 4 	PUT 	/api/posts/:id 	Updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post" 
      });
    } else {
      const updatedPost = await Posts.update(id, { title, contents });
      if (!updatedPost) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist" 
        });
      } else {
        Posts.findById(id)
          .then(post => {
            res.status(200).json(post);
          });
      }
    }
  } catch (error) {
    res.status(500).json({ 
      message: "The post information could not be modified" 
    });
  }
});

// 5 	DELETE 	/api/posts/:id 	Removes the post with the specified id and returns the deleted post object
router.delete('/:id', (req, res) => {
  let post = {};
  Posts.findById(req.params.id)
    .then(p => {
      if (!p){
        res.status(404).json({ 
          message: "The post with the specified ID does not exist" 
        });
        return;
      } else {
        post = p;
      }
    });
  Posts.remove(req.params.id)
    .then(deletedPost => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ 
        message: "The post could not be removed" 
      });
    })
});

// 6 	GET 	/api/posts/:id/comments 	Returns an array of all the comment objects associated with the post with the specified id
router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      if (!comments || comments.length === 0){
        res.status(404).json({
          message: "The post with the specified ID does not exist"
        });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The comments information could not be retrieved"
      });
    });
});


module.exports = router;