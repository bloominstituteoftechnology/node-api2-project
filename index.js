// require your server and launch it here
const server = require('./api/server'); 
port = 3000; 

server.listen(3000, () => {
    console.log(`Server running on port ${port}`)
});