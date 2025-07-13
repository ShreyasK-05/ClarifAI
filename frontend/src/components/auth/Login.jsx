import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const auth = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await auth.login(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to continue</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            name="name" 
            type="text" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
        
        <p className="mt-8 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
