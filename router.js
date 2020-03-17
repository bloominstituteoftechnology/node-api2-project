const express =require('express');
const posts= require ("./data/db");

const router=express.Router();

router.post( "/", (req,res)=>{
    const body =req.body;
})