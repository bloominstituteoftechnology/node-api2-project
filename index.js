const express = require("express");
const postRouter = require("./Routes/postRouter");
const commentRouter = require("./Routes/commentRouter");
const app = express();

app.use(express.json()); // needed to parse JSON from the body
app.use("/api/posts", postRouter);
app.use("/api/posts", commentRouter);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
