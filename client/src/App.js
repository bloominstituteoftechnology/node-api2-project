import React,{useState,useEffect} from 'react';
import axios from "axios"
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import Profile from "./profile"
import Home from "./home"
function App() {
  return (<div>

    <Route exact path="/:id" component={Profile} />
    <Route exact path="/" component={Home}/>
    </div>
  );
}

export default App;
