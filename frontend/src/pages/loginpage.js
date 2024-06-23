
import Home from './Home';

import React, { useState } from 'react';
import axios from 'axios';
import '../LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/Accounts/login/', formData);
      console.log(response.data);
      setIsLoggedIn(true); // Handle successful login (e.g., store token, redirect)
      const token = response.data.token; // Assuming the token is returned in the response data
      console.log(token);
      localStorage.setItem('token', token);
      
    } catch (error) {
      setError('Invalid email or password'); // Handle login failure
    }
    
  };
  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;



