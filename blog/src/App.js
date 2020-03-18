import React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar } from 'reactstrap';
import PostsList from './components/PostsList';
import AddPost from './components/AddPost';
import './App.css';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar>
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          Blog app
        </NavbarBrand>
        <NavLink tag={Link} to="/api/posts"> View all posts </NavLink>
        <NavLink tag={Link} to="/"> Home </NavLink>
        <NavLink tag={Link} to="/api/newpost"> AddPost </NavLink>
      </Navbar>
      <Route path="/api/posts" component={PostsList} />
      <Route path="/api/newpost" component={AddPost} />
      <img
        className={location.pathname === '/api/posts' ? 'active' : ''}
        src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        alt="computer"
      />
    </div>
  );
}

export default App;
