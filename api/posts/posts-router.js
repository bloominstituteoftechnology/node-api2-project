// implement your posts router here
const express = require("express");
const { userParams } = require("../../data/db-config");
const posts = require("./posts-model")

const router = express.Router();





router.get("/posts/:id",(req,res)=>{
    posts.findById(req.params.id)
    .then((post)=>{
        if(!posts){
           return res.status(404).json({
            message:"The post with the specitied ID does not exist"
            })
        }
        res.json(post)
    })
    .catch((error)=>{
        res.status(500).json({
            message:"The post information could not be retrieved"
        })
    })
})




router.post("/posts",(req,res)=>{
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            message:"Please provide title and contents for the post"
        })
    }
    posts.insert(req.body)
    .then((post)=>{
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error adding the user",
        })
    })
})



router.put("/posts/:id",(req,res)=>{
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            message:"Please provide title and contents for the post"
        })
    }
    posts.update(req.body.id,req.body)
    .then((post)=>{
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: "The user could not be found",
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error adding the user",
        })
    })
})








router.delete("/posts/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})










module.exports = router 
