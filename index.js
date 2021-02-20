// require your server and launch it here
const server = require("./api/server");

const port = 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
