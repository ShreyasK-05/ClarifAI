import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const getHomePageData = () => {
    return api.get('/home/questions/all');
}

export const getAdminPageData = () => {
    return api.get('/admin/welcome');
}

export const getQuestions = (searchTerm = '') => {
    return api.get(`/questions${searchTerm ? `/search?keyword=${searchTerm}` : ''}`);
};

export const getQuestionById = (questionId) => api.get(`/questions/${questionId}`);
export const postQuestion = (questionData) => api.post('/questions', questionData);
export const postAnswer = (questionId, answerData) => api.post(`/answers/${questionId}`, answerData);
//export const getTags = () => api.get('/tags');
export const voteAnswer = (answerId, voteData) => {
  return api.patch(`/votes/answer/${answerId}`, voteData);
};

export const postReply = (answerId, replyData) => {
  return api.post(`/answers/${answerId}/replies`, replyData);
};
