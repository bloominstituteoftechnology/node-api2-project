const express = require("express");
const db = require("./data/db");
const router = express.Router();

//client post req w/ title and contents error
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    db.insert(req.body)
      .then(post => {
        db.findById(post.id)
          .then(blog => {
            res.status(201).json(blog);
          })
          .catch(err => {
            console.log("trouble adding blog post", err);
          });
      })
      .catch(err => {
        console.log(err.response);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});

//client makes a post req to comments
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const text = req.body;

  db.findById(id).then(response => {
    if (response.length === 0) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist."
      });
    }
  });
  if (!req.body.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.insertComment({ post_id: id, text: text })
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err.response);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the comment to the database"
        });
      });
  }
});

//client get request w/ standard error
router.get("/", (req, res) => {
  db.find()
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err.response);
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved" });
    });
});

//client makes get req for specific id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findCommentById(id)
    .then(resp => {
      if (resp.length === 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist"
        });
      } else {
        res.status(200).json(resp);
      }
    })
    .catch(err => {
      console.log(err.response);
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved" });
    });
});

//client get req for comment by id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(resp => {
      if (resp.length === 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist"
        });
      } else {
        res.status(200).json(resp);
      }
    })
    .catch(err => {
      console.log(err.response);
      res.status(500).json({
        errorMessage: "The comments information could not be retrieved"
      });
    });
});

//client makes delete req
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(resp => {
      if (resp.length === 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist"
        });
      } else {
        db.remove(id)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    })
    .catch(err => {
      console.log(err.response);
      res.status(500).json({
        errorMessage: "The post could not be removed"
      });
    });
});

//client makes an update request - PUT
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    db.findById(id).then(resp => {
      if (resp.length === 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist"
        });
      } else {
        db.update(id, req.body)
          .then(response => {
            console.log(response)
            db.findById(id).then(post => {
              res.status(200).json(post);
            });
          })
          .catch(err => {
            console.log(err.response);
            res.status(500).json({
              errorMessage: "The comments information could not be retrieved"
            });
          });
      }
    });
  }
});

module.exports = router;