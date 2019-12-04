const express = require('express');

const server = express();

server.use(express.json());

const routes = require('./router/routes');

server.use('/api', routes);



const port = 4000;
server.listen(port, () =>
    console.log(`\n **API running on port ${port}  **\n`)
)
