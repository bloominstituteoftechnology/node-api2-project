import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";

function App() {
  const initialState = {
    title: "",
    contents: ""
  }

  const [postList, setPostList] = useState([initialState])

  return (
    <>
    <Switch>
      <Route path="/addPost">
        <AddPost />
      </Route>

      <Route path="/editPost/:id">
        <EditPost postList={postList} setPostList={setPostList}/>
      </Route>

      <Route path="/">
        <PostList postList={postList} setPostList={setPostList}/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
