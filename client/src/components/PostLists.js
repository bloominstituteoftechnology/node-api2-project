import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PostCard from "./PostCard";

export default class PostLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4500/api/posts/")
      .then(res => {
        this.setState({
          myPosts: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <section className="cardContainer">
        <h1>My Trending Posts</h1>
        {this.state.myPosts.map(post => (
          //   <PostCard key={post.id} card={post} />
          <PostDetail key={post.id} card={post} />
        ))}
      </section>
    );
  }
}

function PostDetail(props) {
  return (
    <>
      <Link to={`/mypost/${props.card.id}`} style={{ textDecoration: "none" }}>
        <PostCard key={props.card.id} card={props.card} />
      </Link>
      ;
    </>
  );
}
