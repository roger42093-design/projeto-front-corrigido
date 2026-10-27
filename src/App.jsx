// src/App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';



import './App.css';
import splashImage from './assets/print certo.jpg'; 
import RegisterFormComponent from './pages/cadastro/Cadastro';

// Componente Dashboard atualizado com botão de Logout
const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="main-content text-white flex flex-col items-center justify-center min-h-screen bg-[#050505]">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo à HelpTec!</h1>
      <p className="text-gray-400 mb-8">Este é o seu ambiente de trabalho protegido.</p>
      <button 
        onClick={logout}
        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#be123c] to-[#4338ca] text-white font-semibold hover:opacity-85 transition-opacity cursor-pointer"
      >
        Sair da Conta (Logout)
      </button>
    </div>
  );
};

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSplashVisible(false), 400);
          return 100;
        }
        return prev + 2; 
      });
    }, 40); 
    
    return () => clearInterval(interval);
  }, []);

  if (isSplashVisible) {
    return (
      <div className="splash-screen">
        <img src={splashImage} alt="HelpTec Splash Screen" className="splash-image" />
        <div className="loading-overlay">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="loading-title">Carregando Sistema {progress}%</p>
          <p className="loading-subtitle">Preparando o ambiente de trabalho</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element={<RegisterFormComponent />}></Route>
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/cadastro" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;