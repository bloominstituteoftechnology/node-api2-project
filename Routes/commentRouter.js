const express = require("express");
const db = require("../data/db");
const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  db.find().then(result => {  
      res.status(200).json(result)    
  })
    .catch(err => {
      res.status(500).json ({ message: "Unable to retrieve comments" })
    })
  });

  router.post("/", (req, res) => {
    db.findById(req.params.id)
      .then(res => {
        if (!req.body.text) {
          res.status(400).json({ message: "Text is required" });
        } else {
          db.insertComment(req.body)
            .then(res => {
              res.status(201);
              db.findById(res.id).then(post => {
                res.json(post);
              });
            })
            .catch(err => {
              res.status(500).json({
                message: "Comment not saved to server, please try again"
              });
            });
        }
      })
      .catch(err => {
        res
          .status(404)
          .json({ message: "The post with that specific ID does not exist." });
      });
  });


module.exports = router;
