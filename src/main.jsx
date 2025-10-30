// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import api, { setAuthToken } from './api/api';
import "./styles/theme.css";
import "./styles/components.css";
import "./styles/animations.css";


const token = localStorage.getItem('slot_token');
if (token) setAuthToken(token);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
