const express = require("express");

const Blogs = require("./db"); // < fix the path

const router = express.Router(); // mind the uppercase R

// middleware

// route handlers - handles what comes after /api/hubs
router.get("/", (req, res) => {
  Blogs.find()
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved. "
      });
    });
});

router.get("/:id", (req, res) => {
  Blogs.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.status(200).json(blog);
        console.log(blog);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({
        errorMessage: "The post information could not be retrieved."
      });
    });
});

router.post("/", (req, res) => {
  const blogInfo = req.body;
  if (blogInfo) {
    Blogs.insert(blogInfo)

      .then(blog => {
        res.status(201).json(blog, "id");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!changes) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  } else {
    Blogs.update(req.params.id, changes)
      .then(blog => {
        if (blog) {
          res.status(200).json(blog);
        }
        {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error updating the post"
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  Blogs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "Delete Spell Critical Hit!!! It was Super Effective!"
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The post could not be removed"
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Blogs.findById(id).then(post => {
    console.log(post);
    if (post) {
      Blogs.findPostComments(id)

        .then(blog => {
          console.log(blog);
          if (blog) {
            res.status(200).json(blog);
            console.log(blog);
          } else {
            res.status(404).json({
              message: "The comment with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          console.log(err);

          res.status(500).json({
            errorMessage: "The comment information could not be retrieved."
          });
        });
    }
  });
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const commentInfo = req.body;

  if (!id) {
    status(404).json({
      message: "The post with the specified ID does not exist."
    });
  } else {
    Blogs.findById(id).then(post => {
      if (post) {
        Blogs.insertComment(commentInfo)

          .then(blog => {
            res.status(201).json(blog, "id");
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            });
          });
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Blogs.findPostComments(id)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved. "
      });
    });
});

module.exports = router;
