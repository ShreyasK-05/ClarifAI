import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getQuestions } from '../services/api';
import SearchBar from '../components/shared/SearchBar'; // make sure this exists
import QuestionCard from '../components/questions/QuestionCard'; // create this if not present

const HomePage = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const fetchQuestions = async (searchTerm = '') => {
    try {
      const res = await getQuestions(searchTerm);
      setQuestions(res.data);
    } catch (err) {
      setError('Failed to load questions');
    }
  };

  useEffect(() => {
    fetchQuestions(); // load all questions initially
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Your role: <span className="font-semibold text-indigo-700">{user?.role}</span></p>
      </div>

      {/* 🔍 Search Bar */}
      <SearchBar onSearch={fetchQuestions} />

      {/* ❓ List of Questions */}
      <div className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        {questions.length > 0 ? (
          questions.map((q) => <QuestionCard key={q._id} question={q} />)
        ) : (
          <p className="text-gray-500">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
