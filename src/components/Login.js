import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../data/data';
import "./Login.css";

const Login = ({ onLogin }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const loggedInUser = await loginUser(username, password);
      setUser(loggedInUser);
      onLogin(loggedInUser);
      window.location.reload();
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='container'>
        <div className='login-form'>
        <h2>Login</h2>
        <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
        </div>
    </div>
  );
};

export default Login;
