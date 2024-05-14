import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Settings from './Pages/Settings.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import CreateCharacter from './Pages/CreateCharacter.jsx';
import axios from 'axios';
import { Toaster } from "react-hot-toast"
import { UserContextProvider } from '../context/userContext.jsx';
import Account from './Pages/Account.jsx';
import './App.css';

axios.defaults.baseURL = 'http://localhost:5050'
axios.defaults.withCredentials = true

function App() {
  return (
    <div className='background'>
      <UserContextProvider>
        <Router>
          <Header />
          <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
          <div className='content-block'>
            <div className='border'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<CreateCharacter />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </UserContextProvider>
    </div>
  
  );
}

export default App;
