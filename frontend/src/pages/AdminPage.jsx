import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAdminPageData } from '../services/api';

const AdminPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminPageData()
      .then(response => setData(response.data.message))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch admin data'));
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome, Admin <strong className="text-red-600">{user?.name}</strong>!
        </p>
        <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-gray-700">You have special administrative privileges with the <span className="font-semibold bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">{user?.role}</span> role.</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Protected Admin Data from Server:</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg min-h-[80px] flex items-center">
            {data && <p className="text-yellow-800 font-medium">{data}</p>}
            {error && <p className="text-red-800 font-medium">{error}</p>}
            {!data && !error && <p className="text-gray-500">Loading data...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
