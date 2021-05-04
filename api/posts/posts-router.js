// implement your posts router here

const Posts = require("./posts-model");

const router = require("express").Router();

// [GET] posts /api/posts
router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: err,
      });
    });
});

// [GET] post by id  /api/posts/:id
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The posts information could not be retrieved",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: err,
      });
    });
});

// [POST] post /api/posts
router.post("/", (req, res) => {
  if (req.body.title && req.body.contents) {
    const newPost = {
      title: req.body.title,
      contents: req.body.contents,
    };
    Posts.insert(newPost)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
});

// [PUT] post by id /api/posts/:id
router.put("/:id", (req, res) => {
  if (req.body.title && req.body.contents) {
    Posts.update(req.params.id, req.body)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "The post information could not be modified",
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
});

// [DELETE] post by id /api/posts/:id
// router.delete("/:id", (req, res) => {
//   Posts.remove(req.params.id)
//     .then((post) => {
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "The post could not be removed",
//       });
//     });
// });

router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        Posts.remove(req.params.id).then(() => {
          res.status(404).json(post);
        });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post could not be removed",
      });
    });
});

// [GET] post comments by id /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});

module.exports = router;
