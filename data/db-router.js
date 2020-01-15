const express = require('express');
const Database = require('./db');
const router = express.Router()

router.post('/',(request,response)=>{
    postData = request.body 
    if(!postData.title || !postData.contents){
        return response.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
Database.insert(postData)
.then(post=>{
    console.log(post)
    response.status(200).json(post)
})
.catch(err=>{console.log(err)
response.status(500).json({error: "There was an error while saving the post to the database"})
})
    }
})




module.exports = router
