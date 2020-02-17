const express = require('express');
const db = require("../data/db");

const router = express.Router();
router.use(express.json());

module.exports = router;


// | POST   | /api/posts              | Creates a post using the information sent inside the `request body`.                                                                                                        |
router.post("/", (req, res) => {
    if (req.body.title && req.body.contents) {
      db.insert(req.body)
        .then(() => res.status(201).json(req.body))
        .catch(() =>
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          })
        );
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
})
// | POST   | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.                                                                   |
router.post("/:id/comments", (req, res) => {
    db.findById(req.params.id)
      .then(posts => {
        if (!posts) {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
              });
        } else {
            if (req.body.text) {
                db.insertComment(req.body)
                  .then(comment => res.status(201).json(comment))
                  .catch(() =>
                    res.status(500).json({
                      error: "There was an error while saving the comment to the data base"
                    })
                  );
            } else {
                res.status(400).json({ 
                    errorMessage: "Please provide text for the comment." 
                });
            }
        }
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        })
      );
    db.insertComment();
})
// | GET    | /api/posts              | Returns an array of all the post objects contained in the database.                                                                                                         |
router.get("/", (req, res) => {
    db.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(() => {
        res.status(500).json({
            error: "The posts information could not be retrieved." 
        })
      })
})
// | GET    | /api/posts/:id          | Returns the post object with the specified id.                                                                                                                              |
router.get("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(post => {
        if (!post) {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
            });
        } else {
            res.status(200).json(post); 
        }
      })
      .catch(() => {
        res.status(500).json({ 
            error: "The post information could not be retrieved." 
        });
      });
})
// | GET    | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.                                                                                 |
router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
      .then(comments => {
        if (!comments) { 
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
            });
        } else {
            res.status(200).json(comments);
        } 
      })
      .catch(() => {
        res.status(500).json({ 
              error: "The comments information could not be retrieved." 
        });
      });
})
// | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
router.delete("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(posts => {
        if (!posts) {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
            });
        } else {
            db.remove(req.params.id)
            .then(() => {res.status(200).json({ 
                message: "posts removed " 
              })
            })
            .catch(() => {
              res.status(500).json({
                error:"The post could not be removed"
              });
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The post could not be removed"
        });
      });
  });
// | PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
router.put("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(posts => {
        if (!posts) {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." 
            });
        } else {
            if (req.body.title && req.body.contents) {
                db.update(req.params.id, req.body)
                  .then(() => res.status(200).json(req.body))
                  .catch(() => {
                    res.status(500).json({
                      error: "There was an error while saving the comment to the data base"
                    });
                  });
              } else {
                res.status(400).json({
                  errorMessage: "Please provide title and contents for the post."
                });
              }
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the comment to the data base"
        });
      });
  });