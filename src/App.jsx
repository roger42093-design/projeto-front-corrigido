// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; // Importação da página de Cadastro adicionada

// CSS e Imagem da Splash Screen
import './App.css';
import splashImage from './assets/print certo.jpg'; 

// Um componente simples para o Dashboard (apenas para testar)
const Dashboard = () => (
  <div className="main-content text-white flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <h1 className="text-3xl font-bold mb-4">Bem-vindo à HelpTec!</h1>
    <p>Este é o seu ambiente de trabalho protegido.</p>
  </div>
);

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Lógica da Barra de Carregamento (Splash Screen)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsSplashVisible(false), 400); // Esconde a splash screen
          return 100;
        }
        return prev + 2; 
      });
    }, 40); 
    
    return () => clearInterval(interval);
  }, []);

  // 1. Enquanto estiver a carregar, mostra APENAS a Splash Screen
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

  // 2. Quando a Splash Screen termina, carrega o sistema de Rotas e Autenticação
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota pública de Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rota pública de Cadastro */}
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rota privada do Dashboard (só acede se estiver logado) */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          {/* Se tentar aceder a qualquer outra rota, envia para o Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;