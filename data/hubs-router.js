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

//GET /api/posts/:id
router.get("/:id", (req, res) => {
 const id = req.params.id;
 dbs
   .findById(id)

   .then(post => {
     if (post.length) {
       res.status(200).json(post);
     } else {
       res.status(404).json({
         message: "The post with the specified ID does not exist"
       });
     }
   })
   .catch(error => {
     res.status(500).json({
       error: "The post information could not be retrieved."
     });
   });
});


module.exports = router;
