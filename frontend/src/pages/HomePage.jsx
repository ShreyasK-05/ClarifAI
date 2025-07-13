import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getHomePageData } from '../services/api';

const HomePage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getHomePageData()
      .then(response => setData(response.data.message))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch data'));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">User Home Page</h1>
        <p className="text-lg text-gray-600">
          Welcome back, <strong className="text-indigo-600">{user?.name}</strong>!
        </p>
        <div className="bg-gray-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
          <p className="text-gray-700">Your current role is: <span className="font-semibold bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full">{user?.role}</span></p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Protected Data from Server:</h3>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg min-h-[80px] flex items-center">
            {data && <p className="text-green-800 font-medium">{data}</p>}
            {error && <p className="text-red-800 font-medium">{error}</p>}
            {!data && !error && <p className="text-gray-500">Loading data...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
