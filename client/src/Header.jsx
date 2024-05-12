import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../src/styles/Header.css';


function Header() {

    return(
        <>  
            <nav>
                <ul>
                    <li><Link to="/">TexVenture</Link><br /></li>
                    <li id="link"><Link to="/">Home</Link><br /></li>
                    <li id="link"><Link to="/account">Account</Link><br /></li>
                    <li id="link"><Link to="/about">About</Link><br /></li>
                    <li id="link"><Link to="/settings">Settings</Link><br /></li>
                    <li id="link"><Link to="/register">Register</Link><br /></li>
                    <li id="link"><Link to="/login">Login</Link><br /></li>
                </ul>
            </nav>
        </>   
    );
}

export default Header;