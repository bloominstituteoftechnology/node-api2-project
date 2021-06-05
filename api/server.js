// implement your server here
    const express = require('express');

    const server = express ();

    server.use(express.json());



//  create a const that requires the post model
// require your posts router and connect it here
server.post ('/api/posts', (req, res) => {



})