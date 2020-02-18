const port = 3000;
const server = require('./api/server');

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 