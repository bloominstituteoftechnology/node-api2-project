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

// gets a specific posts comments from the database
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
        });
    });
});

// gets a specific post from the database
router.get("/:id", (req, res) => {
    const id = req.params.id
    data.findById(id)
    .then(specific => {
        if (id) {
            res.status(200).json(specific);
        } else {
            res.status(404).json({
                message: "The post with the specific ID does not exist"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The post information could not be retrieved"
        })
    })
})

module.exports = router;