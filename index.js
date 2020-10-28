const express = require("express");

const db = require("./data/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hello world!</h2>");
});

app.get("/api/posts", (req, res) => {
  try {
    db.find(req.query).then((posts) => {
      res.status(200).json(posts);
    });
  } catch (err) {
    res.status(500).json({
      error: "The posts information could not be retrieved.",
    });
  }
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.findById(id).then((post) => {
      res.status(200).json(post[0]);
    });
  } catch (err) {
    res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

app.get("/api/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  try {
    db.findCommentById(id).then((post) => {
      if (!post.length) {
        res.status(400).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(post);
      }
    });
  } catch (err) {
    res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

app.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    db.insert(req.body)
      .then((postId) => {
        const post = req.body;
        post.id = postId.id;
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

app.listen(5000, () => console.log("API running on port 5000"));
