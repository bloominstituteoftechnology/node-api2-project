const server = require('./api/server.js')

const PORT = 4000;

server.listen(PORT, () =>{
    console.log('\n *** Server is Running on http://localhost:${PORT} ***\n');
});