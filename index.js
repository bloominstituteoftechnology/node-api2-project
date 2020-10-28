const express = require("express");

const postsRouter = require("./routers/express-router");

const app = express();

app.use(express.json());
app.use(postsRouter);

app.get("/", (req, res) => {
  res.send("<h2>Hello world!</h2>");
});

app.listen(5000, () => console.log("API running on port 5000"));
