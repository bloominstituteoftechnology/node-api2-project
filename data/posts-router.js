// We need express to create a router
const express = require("express");
// We need to import any other dependencies for this module
const Posts = require("./db");
// We need to instantiate a router
const router = express.Router();
// EndPoints for GET api/posts/
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the posts`
      });
    });
});

router.get("/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  // 3 main things we can fish from req:

  // - url parameters req.params.id
  // - body req.body
  // - query string http://google.com?search=cats req.query.search
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: `Post not found`
        });
      }
    })
    .catch(error => {
      // log error to the database
      console.log(error);
      res.status(500).json({
        message: `Error retrieving the posts`
      });
    });
});

router.post(`/`, (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // Log error to database
      console.log(error);
      res.status(500).json({
        message: `Error adding the post`
      });
    });
});

router.delete(`/:id`, (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `The post has been deleted`
        });
      } else {
        res.status(404).json({
          message: `The post could not be found`
        });
      }
    })
    .catch(error => {
      // Log error to the database
      console.log(error);
      res.status(500).json({
        message: `Èrror removing the post`
      });
    });
});
// export the router to the outside world
module.exports = router;
