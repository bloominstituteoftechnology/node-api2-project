const express = require("express")

const data = require("../data/db.js");

const router = express.Router();

router.use(express.json());

// router.get("/", (req, res) => {
//     res.status(200).send("hello from the GET /api/posts")
// });

// gets all the posts from database
router.get("/", (req, res) => {
    data.find()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The posts information could not be retrieved"
        });
    });
});

// gets all the comments from the database
router.get("/:id/comments", (req, res) => {
    const postId = req.params.id
    data.findPostComments(postId)
    .then(comments => {
        res.status(200).json(comments);        
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            message: "The post with the specifin ID does not exist"
        })
    })
})

module.exports = router;