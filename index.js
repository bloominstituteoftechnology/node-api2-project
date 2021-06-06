// require server
const server = require("./api/server");

// set server port
const port = 5000;

// start server
server.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
