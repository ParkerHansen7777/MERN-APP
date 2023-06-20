import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
/*import Sidebar from "./components/sidebar.component";*/
import Navbar from "./components/navbar.component";
import GamesList from "./components/games-list.component";
import EditGame from "./components/edit-games.component";
import CreateGame from "./components/create-game.component";
import CreateUser from "./components/create-user.component";
import "./App.css";
import "./components/component.css";

function App() {
  
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("https://gametracker-mern-app.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[]);
  
  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={GamesList} />
        <Route path="/edit/:id" exact component={EditGame} />
        <Route path="/create" exact component={CreateGame} />
        <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
