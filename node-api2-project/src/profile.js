import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = props => {
  // console.log(props);
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  // const id = props.match.id
  // console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts`)
      .then(res => {
        setData(res.data.users[0]);
        console.log(res);
      })
      .catch(err => console.log(err));

    // useEffect(() => {
    axios
      .get(`http://localhost:8000/api/comments`)
      .then(res => {
        setComments(res.data);
        // console.log("getComments", res.data);
      })
      .catch(err => console.log(err));
  }, []);
  // console.log(data)

  return (
    <div>
      <p>{data.title}</p>
      <p>{data.contents}</p>
      <h2>Comments</h2>
      {console.log("comments", comments)}
      {comments.map(comment => (
        <div id={comment.id}>
          <p>
            {comment.id}: {comment.title}
          </p>{" "}
        </div>
      ))}
    </div>
  );
};

export default Profile;
