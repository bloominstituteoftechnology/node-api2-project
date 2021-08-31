// require your server and launch it here

const server = require("./api/server");
//handle imports 
//create an instance of an express app
server.listen(5000, ()=> {
    console.log("Magic happening on http://localhost:5000!")
})
