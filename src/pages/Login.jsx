// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css'; // Vamos criar este ficheiro a seguir
import splashImage from '../assets/print certo.jpg'; // Reutilizamos a imagem de fundo

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // Simulação da chamada à API
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Credenciais inválidas');
      const data = await response.json();
      
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      setErro('Erro ao fazer login. Verifique os seus dados.');
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url('${splashImage}')` }}>
      
      {/* Logótipo no canto superior esquerdo */}
      <div className="login-logo">
        <h1>HelpTec</h1>
      </div>

      {/* Caixa de Login com efeito Glassmorphism */}
      <div className="login-glass-card">
        <h2 className="login-title">Acesso ao Portal de Suporte</h2>
        
        {erro && <p className="login-error">{erro}</p>}

        <form onSubmit={handleLogin}>
          {/* Campo E-mail/Usuário */}
          <div className="input-group">
            <label>E-mail ou Usuário</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Campo Senha */}
          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Opções extras */}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>
          
          {/* Botão com gradiente */}
          <button type="submit" className="login-submit-btn">
            ENTRAR
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <div className="login-footer">
        <p>HelpTec 2024 © Todos os direitos reservados. <a href="#">Política de Privacidade</a> | <a href="#">Termos de Serviço</a>.</p>
      </div>
    </div>
  );
}