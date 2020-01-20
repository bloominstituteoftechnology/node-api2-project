const server = require("./server");
const port = 4500;

server.listen(port, () => {
  console.log("*** listening on port: ", port);
});
