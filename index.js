// server variables and requires

const express = require('express');
const server = express();
const port = 8000

// routing variables and requires
const postsRouter = require ('./routes/postsRouter');


// middleware variables and requires
server.use(express.json());

// API Routing
server.use('/api/posts', postsRouter)

// Default welcome when visiting "/"

server.get('/', (req, res) => {
  res.send(`Greetings Mortals`);
});


// Turn on the ears

server.listen(port, () => {
  console.log(`\n*** The Thing that gets me the grade is running at  http://localhost:${port} ***\n`);
});
