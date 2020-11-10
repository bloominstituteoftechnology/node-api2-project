// import logo from './logo.svg';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [posts, setPosts] = useState();
  useEffect(()=>{
    axios.get('http://localhost:8000/api/posts')
    .then(res => {
      console.log(res)
      setPosts(res.data)

    })
    .catch(error => {
      console.log(error)
    })
    axios.get('http://localhost:8000/api/posts/4/comments')
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error)
    })
  },[])


  return (
    <div className="App">
      <header className="App-header">
        {posts.map(post => (<div className="App"><h3>{post.title}</h3><p>{post.contents}</p></div>))}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
