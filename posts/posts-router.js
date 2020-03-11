const express = require("express");
const db = require("../data/db");
const router = express.Router();

//route handlers go here:

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (!post.length) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        console.log(post);
        res.status(200).json(post);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

router.get("/:id/comments", (req, res) => {
  console.log(req.params.id);
  db.findPostComments(req.params.id)
    .then(comments => {
      console.log(comments);
      if (!comments.length) {
        res.status(500).json({
          error: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(400).json({
      error: "Please provide title and contents for the post."
    });
  } else {
    db.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const comment = { ...req.body, post_id: id };
  db.insertComment(comment)
    .then(inserted => {
      if (!id.length) {
        res.status(404).json({
          error: "The post with the specified ID does not exist."
        });
      } else if (!req.body.text) {
        res.status(400).json({
          error: "Please provide text for the comment."
        });
      } else {
        res.status(201).json(inserted);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          error: "No post was found to delete."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log("Delete error", error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

router.put("/:id", (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res.status(400).json({
      error: "Please provide title and contents for the post."
    });
  } else if (!req.params.id) {
    res.status(404).json({
      error: "The post with the specified ID does not exist."
    });
  } else {
    db.update(req.params.id, req.body)
      .then(changes => {
        res.status(200).json(req.body);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  }
});

module.exports = router;