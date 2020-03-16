import React from 'react';
import { Route } from 'react-router-dom';
import PostsList from './components/PostsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello from the blog app</h1>
      <Route path="/api/posts" component={PostsList} />
    </div>
  );
}

export default App;
