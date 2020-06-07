const express = require("express");
const db = require("../data/db");

const router = express.Router();

//*********************************************************************** */
// POST Request api/posts/✅
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  db.insert(req.body)
    .then((response) => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//*********************************************************************** */

// POST Request api/post/:id/comments
// router.post('/:id/comments', (req, res) => {
//     const postId = req.params
//     const {comment} = req.body

//     if(!comment) {
//         return res.status(400).json({
//             errorMessage: "Please provide text for the comment."
//         })
//     }

//     res.send("Texting")

// })

//*********************************************************************** */

//GET Reuest api/post✅
router.get("/", (req, res) => {
  db.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//*********************************************************************** */

//GET Request api/post/:id✅
router.get("/:id", (req, res) => {
  const id = req.params.id;
  
  db.findById(id)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        } else {
            res.status(200).json(response)
        }
    })
    .catch(err => {
        res.status(500).then({
            error: "The post information could not be retrieved."
        })
    })
});

//***********************************************************************
//GET Request api/post/:id'/comments✅
router.get("/:id/comments", (req, res) => {
    const id = req.params.id

    db.findCommentById(id)
        .then(response => {
            if(response.length === 0) {
                then(404).json({ 
                    message: "The post with the specified ID does not exist." 
                })
            } else {
                res.status(200).json(response)
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The comments information could not be retrieved." 
            })
        })
})

//***********************************************************************
// DELETE Request api/post/:id

router.delete("/:id", (req, res) => {
    const id = req.params.id

    db.remove(id)
        .then(response => {
            if(!id){
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.status(200).json({
                    message:"User Deleted"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})
//***********************************************************************

module.exports = router;
