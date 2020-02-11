const express = require("express");
const db = require("./data/db");
const server = express();
const port = 5000;
const cors = require("cors");
server.use(express.json());
server.use(cors());

//returns array of every post
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

//returns a single post by id
server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params
  db.findById(id)
    .then(post => {
      post ? res.status(200).json(post) : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
// When the client makes a `POST` request to `/api/posts`:

// - If the request body is missing the `title` or `contents` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// - If the information about the _post_ is valid:

//   - save the new _post_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _post_.

// - If there's an error while saving the _post_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.
server.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents){
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    db.insert(req.body)
      .then(postId => {
        res.status(201).json(postId);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The posts has not been created" })
    })
  }
})

server.listen(5000, () => {
  console.log(`server listening on port ${port}`);
});
