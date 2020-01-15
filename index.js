const server = require('./server.js');
const port = 3456;

server.listen(port, () => {  
  console.log(`\n *** Server Running on http://localhost:${port} *** `);
});

