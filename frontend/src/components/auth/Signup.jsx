import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await registerUser(formData);
      if (response.data.success) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Your Account</h2>
        <p className="text-center text-gray-500 mb-8">Join our community today!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            name="name" 
            type="text" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
        {message && <p className="mt-4 text-center text-green-500 font-medium">{message}</p>}
        
        <p className="mt-8 text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
