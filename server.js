const express = require('express');
const postRouter = require('./hubs/post-router.js')
const morgan = require("morgan"); // HTTP request logger


const server = express();
server.use(express.json());
// .use matches all HTTP mehods (GET< DELETE< PUT, Whatever)
//no path matches ALL paths...if you want to use a oath 
server.use('/api/posts', postRouter);


// call 3rd party middleware
server.use(methodLogger)
server.use(morgan('dev'))

//server.use('/something/anything', hubsRouter)
//Change the URL here  ^^ mounting syntax

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

// logging middleware 

morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        token.status(req, res),
        tokens.res(req, res, "content-length"), '_',
        tokens['response-time'](req, res), 'ms'
    ].join('')
})



function methodLogger(req, res, next) {
    console.log(`${req.method} request`)
    // get put post or whatever methed is used
    // res.send('requested yay!')
    next()
}

module.exports = server;
// add an endpoint for adding new message to a hub