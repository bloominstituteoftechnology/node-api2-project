const express = require("express");
const server = express();
server.use(express.json())

const dataRouter = require('./data-routes/data-router.js')

server.get("/",(req,res)=>{
    res.json({message: "looks like its working"})
})

server.use("/api/posts", dataRouter)

server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n");
})