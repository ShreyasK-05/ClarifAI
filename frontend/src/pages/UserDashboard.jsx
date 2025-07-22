// src/pages/UserDashboard.jsx
import React, { useState } from 'react';
import AskQuestion from '../components/questions/AskQuestion';
import QuestionList from '../components/questions/QuestionList';
import Sidebar from '../components/ui/Sidebar';

const UserDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleQuestionPosted = () => {
    setRefresh((prev) => !prev); // trigger reload of QuestionList
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AskQuestion onQuestionPosted={handleQuestionPosted} />
        <QuestionList key={refresh} />
      </main>
    </div>
  );
};

export default UserDashboard;
