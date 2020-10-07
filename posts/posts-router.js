const express = require("express")
const posts = require("../data/db")
const router = express.Router()

// get all posts
router.get("/posts", (req, res) => {
  posts.find({ sortBy: req.query.sortBy })
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error retrieving the posts",
    })
  })
})

// get posts by id
router.get("/posts/:id", (req, res) => {
  posts.findById(req.params.id)
  .then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "Post not found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error retrieving the post",
    })
  })
})

// make a new post
router.post("/posts", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Missing post title",
    })
  }

  posts.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error adding the post",
    })
  })
})

// updating a specific post
router.put("/posts/:id", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Missing post title",
    })
  }

  posts.update(req.params.id, req.body)
  .then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "Post could not be found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error updating the post",
    })
  })
})

// deleting a post
router.delete("/posts/:id", (req, res) => {
  posts.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "Post successfully deleted",
      })
    } else {
      res.status(404).json({
        message: "Post could not be found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error deleting the post",
    })
  })
})

// endpoint that returns all comments from a post
router.get("/posts/:id/comments", (req, res) => {
  posts.findPostComments(req.params.id)
  .then((comments) => {
    if (comments.length > 0) {
      res.json(comments)
    } else {
      res.status(200).json({
        message: "This post has no comments yet",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Could not get post comments",
    })
  })
})

// endpoint that creates a comment on a specific post
router.post("/posts/:id/comments", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Unable to add comment without text value",
    })
  }

  posts.insertComment(req.params.id, req.body)
  .then((comment) => {
    res.status(201).json(comment)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Could not create post comment",
    })
  })
})

module.exports = router