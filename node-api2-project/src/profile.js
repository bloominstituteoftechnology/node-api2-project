import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = props => {
  // console.log(props);
  const [data, setData] = useState({});
  const [comments, setComments] = useState({});
  // const id = props.match.params.id
  // console.log(id);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then(res => {
        // setData(res.data.users[0])
        console.log(res);
      })
      .catch(err => console.log(err));
  });

    axios.get(`http://localhost3000/api/posts/${id}/comments`)
    .then(res => {
      setComments(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  console.log(data)

  return (
    <div>
      <p>{data.title}</p>
      <p>{data.contents}</p>
      <h2>Comments</h2>
      {/* {comments.map(i => <div id={i.post_id}><p>{i.post_id}: {i.text}</p> </div>)} */}
    </div>
  );
};

export default Profile;
