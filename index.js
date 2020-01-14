// we need to pull server in here!!!
const server = require("./server");
server.listen(5000, () => {
  console.log(`Running on port 5000`);
});
