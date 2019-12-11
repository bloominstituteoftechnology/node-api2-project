const express = require("express")
const dbs = require("./db")
const router = express.Router()

//get api/posts

router.get("/", (req, res) => {
 dbs
   .find()
   .then(posts => {
     res.status(200).json(posts);
   })
   .catch(error => {
     res.status(500).json({
       error: "The posts information could not be retrieved"
     });
   });
});

