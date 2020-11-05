module.exports = (format) => {
  const time = new Date().toISOString();

  return (req, res, next) => {
    //user agent making the REQUEST exp: insomnia, Postman
    const agent = req.headers["user-agent"];
    switch (format) {
      case "long":
        //log this info out for every request that comes in before moving on the route
        console.log(
          `long: [${time}] ${req.ip}, ${req.method}, ${req.url}, ${agent}`
        );
        break;
      case "short":
        console.log(`Short: ${req.method}, ${req.url}`);
        break;
      default:
        return format;
    }

    //this middleware is finished, move on to next piece of middleware in the stack
    next();
  };
};
