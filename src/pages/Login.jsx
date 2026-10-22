import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import './Login.css'; 
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de Login:', { email, password });
  };

  const handleGoogleAuth = () => {
    console.log('Login com Google');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="form-content">
          <h1 className="title">
            Faça seu Login<span className="pink-dot">.</span>
          </h1>

          <form onSubmit={handleLoginSubmit}>
            <div className="input-block">
              <label>Email</label>
              <div className="gradient-border-input">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="input-block">
              <label>Senha</label>
              <div className="gradient-border-input">
                <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="forgot-link-wrapper">
                <Link to="/esqueci-senha" className="text-link">Esqueceu minha senha</Link>
              </div>
            </div>
            
            <button type="submit" className="btn-entrar">
              Entrar
            </button>
          </form>

          <div className="divider">
            <span>ou</span>
          </div>

          <button type="button" className="btn-google" onClick={handleGoogleAuth}>
            {/* Ícone do Google omitido para brevidade, use o mesmo SVG de antes */}
            Entrar com o Google
          </button>

          <div className="register-wrapper">
            {/* Redireciona para a rota /cadastro */}
            <Link to="/cadastro" className="text-link secondary">
              Ainda não tenho uma conta
            </Link>
          </div>
        </div>

        <div className="footer-credits">
          2023 | Desenvolvido por <a href="#leonardo">Leonardo Diman</a>
        </div>
      </div>

      <div className="login-right" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="dark-fade"></div>
      </div>
    </div>
  );
}