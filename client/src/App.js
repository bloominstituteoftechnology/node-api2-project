import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";

function App() {
  const initialState = {
    title: "",
    contents: ""
  }

  const [postList, setPostList] = useState([initialState])

  return (
    <Switch>
      <Route path="/addPost">
        <AddPost postList={postList} setPostList={setPostList}/>
      </Route>

      <Route path="/editPost">
        <EditPost postList={postList} setPostList={setPostList}/>
      </Route>

      <Route path="/posts">
        <Home postList={postList} setPostList={setPostList}/>
      </Route>
    </Switch>
  );
}

export default App;
