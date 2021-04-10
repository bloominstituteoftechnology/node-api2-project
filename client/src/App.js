import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/addPost">
        <AddPost />
      </Route>

      <Route path="/editPost">
        <EditPost />
      </Route>
    </Switch>
  );
}

export default App;
