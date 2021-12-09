// require your server and launch it here
const server = require("./api/server");

server.listen(9990, () => {
  console.log("server running on 9990");
});
