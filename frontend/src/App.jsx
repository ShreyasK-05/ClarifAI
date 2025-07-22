import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import UserDashboard from './pages/UserDashboard';
import QuestionPage from './pages/QuestionPage';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/" element={<Navigate to="/login" />} />

              <Route element={<UserRoute />}>
                <Route path="/home" element={<UserDashboard />} />
                <Route path="/home/questions" element={<UserDashboard />} />
                <Route path="/home/questions/:id" element={<QuestionPage />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
