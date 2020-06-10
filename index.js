const server = require("./routes/server");

const port = 7000;

server.listen(port, () => {
  console.log("Server has now started!!");
});
