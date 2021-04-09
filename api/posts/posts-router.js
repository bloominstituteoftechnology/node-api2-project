// implement your posts router here

const express = require("express")
const posts = require("./posts-model")

const router = express.Router()

router.get("/api/posts", (req, res) => {

})

router.get("/api/posts/:id", (req, res) => {
    
})

router.post("/api/posts	", (req, res) => {
    
})

router.put("/api/posts/:id	", (req, res) => {
    
})

router.delete("/api/posts/:id	", (req, res) => {
    
})

router.get("/api/posts/:id/comments	", (req, res) => {
    
})

module.exports = router