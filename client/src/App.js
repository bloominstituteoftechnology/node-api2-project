import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './App.css';

function App() {
  const [post, setPost] = useState();

  axios
    .get('http://localhost:5000/api/posts')
    .then(res => {
      console.log(res);
      setPost(res.data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div className='App'>
      {/* {post.map(post => {
        return <li>{post.content}</li>;
      })} */}
    </div>
  );
}

export default App;
