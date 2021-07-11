// require your server and launch it here
const server = require("./api/server");

server.listen(3000, () => {
  console.log("\n*** Server running on http://localhost:3000 ***\n");
});
