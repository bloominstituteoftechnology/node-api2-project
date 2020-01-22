import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdatePost(props) {
  const [myPost, setMyPost] = useState({});
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4500/api/posts/${id}`)
      .then(res => {
        res.data.map(post => setMyPost(post));
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    e.preventDefault();

    setMyPost({
      ...myPost,
      [e.target.name]: e.target.value
    });
  };

  const handelSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:4500/api/posts/${id}`, myPost)
      .then(res => {
        props.history.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form className="postForm" onSubmit={handelSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={myPost.title}
        />
        <textarea
          className="contentArea"
          name="contents"
          onChange={handleChange}
          value={myPost.contents}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdatePost;
