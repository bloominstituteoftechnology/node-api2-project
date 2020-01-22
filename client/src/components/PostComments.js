import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostComments(props) {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    const id = props.id;
    axios
      .get(`http://localhost:4500/api/posts/${id}/comments`)
      .then(res => {
        setMyPost(res.data);
      })
      .catch(err => console.log(err));
  }, [myPost]);
  return (
    <div>
      <h1>Comments</h1>
      <div className="container commentContainer ">
        {myPost.map(comment => (
          <p key={comment.id}>{comment.text}</p>
        ))}
      </div>
    </div>
  );
}
