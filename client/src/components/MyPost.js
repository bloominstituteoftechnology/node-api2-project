import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { Route } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import PostCard from "./PostCard";
import PostComments from "./PostComments";
import AddComment from "./AddComment";

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      myPost: [],
      isComment: false,
      showCommentModal: false
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4500/api/posts/${this.state.id}`)
      .then(res => {
        this.setState({
          myPost: res.data
        });
      })
      .catch(err => console.log(err));
  }

  handleViewComment = e => {
    e.preventDefault();
    this.props.history.push(`/mypost/${this.state.id}/comments`);
    this.setState({
      isComment: true
    });
  };

  handleHideComment = e => {
    e.preventDefault();
    this.props.history.push(`/mypost/${this.state.id}`);
    this.setState({
      isComment: false
    });
  };

  handleDelete = e => {
    e.preventDefault();
    confirmAlert({
      message: "Are you sure you want to delete this post.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios
              .delete(`http://localhost:4500/api/posts/${this.state.id}`)
              .then(res => {
                console.log("Deleted Post: ", res);
                alert("Your Post has been deleted");
                this.props.history.push("/");
              })
              .catch(err => console.log(err))
        },
        {
          label: "No",
          onClick: () => alert("Your Post has not been deleted")
        }
      ]
    });
  };

  handleModal = e => {
    this.setState({
      showCommentModal: !this.state.showCommentModal
    });
  };
  render() {
    return (
      <>
        <section className="cardContainer">
          <h1>My Single Post</h1>
          {this.state.myPost.map(post => (
            <PostCard key={post.id} card={post} />
          ))}
        </section>
        <section className="postSubNav">
          <button
            onClick={() =>
              this.props.history.push(`/update-post/${this.state.id}`)
            }
          >
            Edit Post
          </button>
          <button onClick={this.handleDelete}>Delete Post</button>

          {this.state.isComment ? (
            <button onClick={this.handleHideComment}>Hide Comments</button>
          ) : (
            <button onClick={this.handleViewComment}>View Comments</button>
          )}

          <button onClick={this.handleModal}>Add Comment</button>
        </section>

        <div>
          <Route
            path={`/mypost/${this.state.id}/comments`}
            render={props => <PostComments {...props} id={this.state.id} />}
          />

          <AddComment
            show={this.state.showCommentModal}
            handleModal={this.handleModal}
            id={this.state.id}
          />
        </div>
      </>
    );
  }
}
