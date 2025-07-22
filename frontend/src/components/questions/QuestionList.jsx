// src/components/questions/QuestionList.jsx
import React, { useEffect, useState } from 'react';
import { getQuestions } from '../../services/api';
import { Link, useLocation } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const searchTerm = params.get('search') || '';
      const res = await getQuestions(searchTerm);
      setQuestions(res.data.questions || []);
    } catch (err) {
      setError('Failed to fetch questions.');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [location]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Questions</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q._id} className="bg-gray-100 p-4 rounded hover:bg-gray-200 transition">
            <Link to={`/home/questions/${q._id}`} className="text-blue-600 font-medium text-lg">
              {q.title}
            </Link>
            <div className="mt-1 text-sm text-gray-600">Tags: {q.tags.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
