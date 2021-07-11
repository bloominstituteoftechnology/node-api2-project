// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();
/*[GET] /api/posts
✓ [1] can get the correct number of posts
✓ [2] can get all the correct posts 
*/
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      //   console.log(posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      //   console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

/* GET] /api/posts/:id
✓ [3] can get all the correct posts by id
✓ [4] reponds with a 404 if the post is not found 
*/
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
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
        message: "The post information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

/*[POST] /api/posts 
✓ [5] responds with a 201 
✕ [6] responds with a new post
✓ [7] on missing title or contents responds with a 400 
*/
router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.insert(post)
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((newPost) => {
        console.log(newPost);
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

/*[PUT] /api/posts/:id
✕ [8] responds with updated user
✓ [9] saves the updated user to the db
✓ [10] responds with the correct message & status code on bad id
✓ [11] responds with the correct message & status code on validation problem 
*/

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.findById(req.params.id)
      .then((posts) => {
        if (!posts) {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          return Post.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        if (data) {
          return Post.findById(req.params.id);
        }
      })
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be retrieved",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

/*[DELETE] /api/posts/:id
✓ [12] reponds with a 404 if the post is not found
✕ [13] reponds with the complete deleted post 
✓ [14] removes the deleted post from the database 
*/
router.delete("/:id", async (req, res) => {
  try {
    const possiblePost = await Post.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      await Post.remove(req.params.id);
      res.status(200).json(possiblePost);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      err: err.message,
      stack: err.stack,
    });
  }
});

/*GET] /api/posts/:id/comments
✓ [15] reponds with a 404 if the post is not found 
✕ [16] can get all the comments associated to the posts with given id  */
router.get("/:id/comments", async (req, res) => {
  try {
    const possiblePost = await Post.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
    });
  }
});

router.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found )*:" });
});

module.exports = router;
