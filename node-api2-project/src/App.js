import React from 'react';
import Profile from './profile';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Users</h1>
      <Home />
      <Profile />
    </div>
  );
}

export default App;
