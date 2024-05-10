import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import HowToPlay from './Pages/HowToPlay.jsx';
import Settings from './Pages/Settings.jsx';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div style={{ width: '90%', border: '1px solid black', padding: '6vh', borderRadius: '10px', minHeight: '50vh'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/howtoplay" element={<HowToPlay />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
