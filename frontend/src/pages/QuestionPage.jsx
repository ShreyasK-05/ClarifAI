// src/pages/QuestionPage.jsx
import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import QuestionDetails from '../components/questions/QuestionDetails';

const QuestionPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <QuestionDetails />
      </main>
    </div>
  );
};

export default QuestionPage;
