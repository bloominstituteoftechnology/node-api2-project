const express = require("express");

const Data = require('./db');

const router = express.Router

//  /api/posts


router.get('/', (req, res) => {
  Data.find(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
  })
});

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post"})
  }
  else {
    Data.insert(req.body)
    .then(post => {
      console.log(error);
      res.status(500).json({ errorMessage: "There was an error saving the post" })
    })
  }
})

// /api/posts/:id

router.get('/:id', (req, res) => {
  Data.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    }
    else {
      res.status(404).json({ errorMessage: "The post does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ errorMessage: "Post info could not be retrieved." })
  })
})

router.delete("/:id", (req, res) => {
  let deletedPost;  Data.findById(req.params.id).then((post) => {    deletedPost = post;  });  Data.remove(req.params.id).then((item) => {    res.json(deletedPost);  });});router.put("/:id", (req, res) => {  let id = req.params.id;  Data.findById(id).then((post) => {    if (!post) {      res        .status(404)        .json({ message: "The post with the specified ID does not exist." });    } else if (!req.body.title || !req.body.contents) {      res.status(400).json({ message: "Provide title and contents." });    } else {      Data.update(id, req.body)        .then((val) => {          Data.findById(id).then((updatedPost) => {            res.status(200).json(updatedPost);          });        })        .catch((err) =>          res            .status(500)            .json({ message: "The post information could not be modified." })        );    }
  });
});
// /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  Data.findById(req.params.id).then((post) => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      Data.findCommentById(req.params.id)
        .then((comments) => {
          res.status(200).json(comments);
        })
        .catch((err) => {
          res.status(500).json({
            message: "The comments information could not be retrieved.",
          });
        });
    }
  });
});
router.post("/:id/comments", (req, res) => {
  Data.findById(req.params.id).then((post) => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!req.body.text) {
      res.status(400).json({ message: "Please provide text for the comment." });
    } else {
      Data.insertComment(req.body)
        .then((comment) => {
          Data.findCommentById(comment.id).then((comment) => {
            res.status(201).json(comment);
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({
              error:
                "There was an error while saving the comment to the database.",
            });
          console.log(err);
        });
    }
  });
});
module.exports = router;
