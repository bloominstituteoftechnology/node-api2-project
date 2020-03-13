const express = require('express')

const router = express.Router()

const commentsDB = require("../db");


router.get("/", (req,res) => {
    commentsDB
    .findPostComments()
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error} couldn't get information`})
    })
})

router.get("/:id", (req,res) => {

    const { id } = req.params;
    commentsDB
    .findCommentById(id)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error}
        your information could't be retrieve
        `})
    })
})





module.exports = router