const server = require('./api/server.js');

server.listen(8000, () => {
    console.log('\n *** Server running on localhost:8000 *** \n');
});