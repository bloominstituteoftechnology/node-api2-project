const express = require('express');

const dataRouter = require('./data/router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', dataRouter);



server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})