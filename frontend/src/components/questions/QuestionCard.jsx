import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  return (
    <Link to={`/questions/${question._id}`}>
      <div className="p-4 bg-white shadow rounded hover:bg-gray-50 transition">
        <h2 className="text-lg font-bold text-indigo-800">{question.title}</h2>
        <p className="text-sm text-gray-600 mt-1">Tags: {question.tags.join(', ')}</p>
      </div>
    </Link>
  );
};

export default QuestionCard;
