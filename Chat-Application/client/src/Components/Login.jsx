import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3001/add-Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,       // From state
                password     // Also from state
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.status); // Logs successful insertion message
            navigate('/chat', { state: { email } });
        } else {
            console.error('Failed to login:', data);
            setError(data.status || 'Failed to login. Please try again.');
        }
    } catch (err) {
        console.error('Error while logging in:', err);
        setError('An error occurred while logging in. Please try again.');
    }
};


  return (
    <>
      <div className="Login">
        <div className="content">
          <h1>Welcome 👋</h1>
          <h3>Fill in the details to get started Chatting</h3>
          <h3>Login</h3>
          <hr />
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <img src="./src/Components/login-removebg-preview.png" className="image1" alt="Login" />
      </div>
    </>
  );
};

export default Login;
