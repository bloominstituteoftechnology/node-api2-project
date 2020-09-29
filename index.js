const express = require("express"); // CommonJS modules
const server = express();
const posts = require('./data/db')

server.use(express.json())

server.post("/api/posts", async (req, res) => { 
    try  {
        const newPost = await posts.insert(req.body)
        res.status(201).json({message: "success", data: newPost})
    } catch {
        res.status(404).json({ message: 'Cant post man' });
    }
})
server.post("/api/posts/:id/comments", async (req, res) => {
    
    try {
        const findComments = await posts.findPostComments(req.params.id).insertComment(req.body, req.params.id)
        res.status(200).json({data: newComment});
    }
    catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved.", error: err});
    };
  });

server.get("/api/posts", async (req, res) => {
    try {
        const postsFetched = await posts.find();
        res.status(200).json({data: postsFetched});
    }
    catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved.", error: err});
    };
});
server.get("/api/posts/:id", async (req, res) => {
    
    try {
        const postsFetchedId =  await posts.findById(req.params.id)
        res.status(200).json({data: postsFetchedId});
    }
    catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved.", error: err});
    };
  });
  server.get("/api/posts/:id/comments", async (req, res) => {
    
    try {
        const postCommentsFetchedId =  await posts.findPostComments(req.params.id)
        res.status(200).json({data: postCommentsFetchedId});
    }
    catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved.", error: err});
    };
  });
const port = 5000;
server.listen(port, () => console.log("server running..."));