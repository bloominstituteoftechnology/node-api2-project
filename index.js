const express = require("express");
const cors = require("cors");
const postRouter = require("./Routes/postRouter");
const commentRouter = require("./Routes/commentRouter");
const app = express();

app.use(express.json()); // needed to parse JSON from the body
app.use(cors());
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const port = 8000;
// const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
