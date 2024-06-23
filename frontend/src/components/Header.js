
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header.css';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      
            <Link to="/">Home</Link>
            
            <Link to="/about">About</Link>
          
            <Link to="/contact">Contact</Link>
            <div>
        <Link to="/signup">Register</Link>
        {isLoggedIn ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/loginpage">Login</Link>
        )}
      </div>
      
    </div>
  );
};

export default Header;
