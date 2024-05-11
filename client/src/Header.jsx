import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function Header() {
    return(
        <header>
            <h1>TexVenture</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link><br /></li>
                    <li><Link to="/about">About</Link><br /></li>
                    <li><Link to="/howtoplay">HowToPlay</Link><br /></li>
                    <li><Link to="/settings">Settings</Link><br /></li>
                    <li><Link to="/login">Login</Link><br /></li>
                    <li><Link to="/register">SignUp</Link><br /></li>
                </ul>
            </nav>
            <hr></hr>
        </header>
        
    );
}

export default Header;