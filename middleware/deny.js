module.exports = () => {
  return (req, res, next) => {
    // a header value from the request that tells us
    //which software was used to call endpoint
    const agent = req.headers["user-agent"];
    //If user agent containts the value like "IMSONMIA, POSTMAN, ETC" in it
    //then prevent the user agent from accessing the GET REQUEST
    if (/test/.test(agent)) {
      //return an error
      return res.status(418).json({
        message: "no insomnia allowed here",
      });
    }
    //finish the stack
    next();
  };
};
