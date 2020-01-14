const express = require('express') 
const app = express()
const PORT = 6000;
const hostname = '127.0.0.1';

const { 
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,} = require ('./data/db');


app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json( "App runs");

})

app.post(`/api/posts`, (req, res) => {

    const {title, contents} = req.body;
    console.log(req.body);

    if(!title || contents) {
        res 
            .status(400)
            .json("Please provide title and contents for the post.")
    } else {
        insert(req.body)
        console.log(req.body)
            .then( post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json("There was an error while saving the post to the database", error)
            })
    }
})










app.listen(PORT, hostname, () => {
    console.log(`App running http://${hostname}:${PORT}`);
  })