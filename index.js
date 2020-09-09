const express = require("express");
const app = express();
const db = require("./data/db");


//creates a new post
app.post("/api/posts", (req, res) => {
    db.insert(req.body)
    .then(post => {
        res.status(201).json({post});
    })
    .catch(err => {
        res.status(500).removeListener({
            message: "Error adding the post"
        });
    });
});

//creates a comment for post with specific id
app.post("/api/posts/:id/comments", (req, res) => {});

// returns array of all post objects
app.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
});

//returns post object with specific id
app.get("/api/posts/:id", (req, res) => {});


//returns array of all comment objects associated with post id
app.get("/api/posts/:id/comments", (req, res) => {});

//removes post with matching id and returns deleted item
app.delete("/api/posts/:id", (req, res) => {});


//updates post with matching id and returns modified
app.put("/api/posts/:id", (req, res) => {});

const port = 5000 || port.env.PORT;
app.listen(port, () => {
    console.log("server listening on: ", port);
});