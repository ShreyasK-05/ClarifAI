// src/components/questions/QuestionDetails.jsx
import React, { useState, useEffect } from 'react';
import { getQuestionById, postAnswer, voteAnswer } from '../../services/api';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react'; 

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [answers, setAnswers] = useState([]);

/* useEffect(() => {
    getQuestionById(id)
      .then((res) => setQuestion(res.data.question))
      .catch(() => setError('Failed to load question.'));
  }, [id, refresh]); */

  useEffect(() => {
  getQuestionById(id)
    .then((res) => {
      setQuestion(res.data.question);
      setAnswers(res.data.answers);
    })
    .catch(() => setError('Failed to load question.'));
}, [id, refresh]); 


  const handlePostAnswer = async () => {
    try {
      await postAnswer(id, { text: answerText });
      setAnswerText('');
      setRefresh((prev) => !prev);
    } catch (err) {
      setError('Failed to post answer.');
    }
  };

  const handleVote = async (answerId, type) => {
  try {
    await voteAnswer(answerId, { voteType: type });
    setRefresh(prev => !prev); 
  } catch (err) {
    setError("Failed to vote.");
  }
};

  if (error) return <p className="text-red-500">{error}</p>;
  if (!question) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{question.title}</h2>
      <p className="text-sm text-gray-600 mb-4">Tags: {question.tags.join(', ')}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Answers:</h3>
        {answers.length > 0 ? (
  <ul className="mt-3 space-y-4">
  {answers.map((a) => (
    <li key={a._id} className="bg-gray-100 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">{a.answeredBy?.name || 'User'}</span>
        <div className="flex items-center space-x-3">
          <button onClick={() => handleVote(a._id, 'up')} title="Upvote">
            <ThumbsUp className="w-5 h-5 text-green-600 hover:text-green-800" />
          </button>
          <span>{a.upvotes}</span>
          <button onClick={() => handleVote(a._id, 'down')} title="Downvote">
            <ThumbsDown className="w-5 h-5 text-red-600 hover:text-red-800" />
          </button>
          <span>{a.downvotes}</span>
        </div>
      </div>
      <p className="text-gray-700">{a.text}</p>
    </li>
  ))}
</ul>

) : (
  <p className="text-gray-500">No answers yet.</p>
)}

      </div>

      <div className="mt-4">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Your answer..."
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
        <button
          onClick={handlePostAnswer}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionDetails;
