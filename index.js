
//Nodemon test
console.log("nodemon successfully working");
// require your server and launch it here
const server = require('./api/server');
//create your port
const port = 5000;
//Start your server!
server.listen(port, ()=>{
    console.log("Server running on 5000")
})

