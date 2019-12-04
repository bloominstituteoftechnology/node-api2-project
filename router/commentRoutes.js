const router = require('express').Router();


const db = require('../data/db')

router.get('/:id/comments', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if (post.length > 0) {
                db.findById(req.params.id)
                    .then(comments => {
                        if (comments.length > 0) {
                            res.status(200).json(comments);
                        }
                        else {
                            res.status(404).json({ message: "There aren't any comments on this post" });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The comments could not be recieved" })
                    });
            }
            else {
                res.status(404).json({ message: "The post with this ID doesn't exist" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Couldn't get post info" })
        });
});

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;

    if (text) {
      db.findById(req.params.id)
        .then(post => {
          if (post.length > 0) {
            db.insertComment({ text: text, post_id: req.params.id })
              .then(() => {
                res.status(201).json({ message: `${text} was commented` });
              })
              .catch(error => {
                res.status(500).json({ error: "There was an error while saving the comment to the database." });
              });
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          }
        })
        .catch(error => {
          res.status(500).json({ error: "Post information could not be retrieved." });
        });
    } else {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
  });





module.exports = router; 