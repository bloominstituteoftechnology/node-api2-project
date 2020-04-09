const express = require("express");
const app = express();
const postsRouter = require("./routes/PostsRoutes");

app.use(express.json());
app.use("/api/posts", postsRouter);

app.listen(process.env.PORT || 4001, () => {
  console.log("listening on port 4001");
});
