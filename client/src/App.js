import React from "react";
import logo from "./logo.svg";

import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>My Posts</h1>
      </header>
      <main>
        <Nav />
      </main>
    </div>
  );
}

export default App;
