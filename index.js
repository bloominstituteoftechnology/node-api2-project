// require your server and launch it here

const server = require('./api/server');

const PORT = process.env.PORT || 8000;

server.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})