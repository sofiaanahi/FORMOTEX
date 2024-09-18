import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import EquiposPage from './pages/Equipos';
import './index.css'; 
import { AuthProvider } from './Context/AuthContext';
const userRole = 'admin'; // o 'user'
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/equipos" element={<EquiposPage userRole={userRole} />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
