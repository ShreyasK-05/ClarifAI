// src/components/questions/AskQuestion.jsx
import React, { useState } from 'react';
import { postQuestion } from '../../services/api';

const AskQuestion = ({ onQuestionPosted }) => {
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!text.trim()) return setError('Question text is required.');

    const questionData = {
      title: text.trim(),
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      const res = await postQuestion(questionData);
      setSuccess('Question posted successfully!');
      setText('');
      setTags('');
      onQuestionPosted(); // refresh question list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post question.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your question..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags separated by commas"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Post Question
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default AskQuestion;
