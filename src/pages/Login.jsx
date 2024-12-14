import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';  // Firebase setup file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');  // Redirect to a dashboard or another page after login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-md mb-4 hover:bg-blue-600"
        >
          Login
        </button>

        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 mb-4"
        >
          Login with Google
        </button>

        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
