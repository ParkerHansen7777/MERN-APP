import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";


export default class Navbar extends Component {

    render() {
        return (
          <nav className="navbar">
            <Link to="/" className="navbar-brand">GameTracker</Link>
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Games</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Game</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Create User</Link>
                </li>
            </ul>
          </nav>  
        );
    }

}