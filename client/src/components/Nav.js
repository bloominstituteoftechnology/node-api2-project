import React from "react";
import { Route, Link } from "react-router-dom";

import PostLists from "./PostLists";
import AddPost from "./AddPost";
import MyPost from "./MyPost";
import UpdatePost from "./UpdatePost.js";

export default function Nav(props) {
  return (
    <>
      <nav className="navBar">
        <Link to="/">My Posts</Link>
        <Link to="/add-post">Add Post</Link>
      </nav>
      <Route exact path="/" component={PostLists} />
      <Route exact path="/add-post" component={AddPost} />
      <Route path="/mypost/:id" component={MyPost} />
      <Route exact path="/update-post/:id" component={UpdatePost} />
    </>
  );
}
