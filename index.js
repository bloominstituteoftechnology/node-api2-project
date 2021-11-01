// require your server and launch it here
const server = require("./api/server");

const port = 5000;

// start server
server.listen(port, () => {
  console.log("Listening on port: ", port);
});
