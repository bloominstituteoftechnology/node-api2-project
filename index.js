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










app.listen(PORT, hostname, () => {
    console.log(`App running http://${hostname}:${PORT}`);
  })