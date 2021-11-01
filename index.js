require("dotenv").config();

// require your server and launch it here

const server = require("./api/server");

const PORT = process.env.PORT || 5000;

// // this should log our .env file port number
// console.log(process.env.PORT);

// start server listener
server.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
