// require your server and launch it here

const server = require('./api/server.js');

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`\n *** Listening on Port ${PORT} *** \n`);
});

const myNameIs = "Sharon";