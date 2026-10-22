import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import './Login.css'; // Reutilizamos o mesmo CSS!
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log('Tentativa de Cadastro:', { nome, email, password });
  };

  const handleGoogleAuth = () => {
    console.log('Cadastro com Google');
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="form-content">
          <h1 className="title">
            Crie sua conta<span className="pink-dot">.</span>
          </h1>

          <form onSubmit={handleRegisterSubmit}>
            <div className="input-block">
              <label>Nome Completo</label>
              <div className="gradient-border-input">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            </div>

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
                {/* Ícone de cadeado */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-block">
              <label>Confirmar Senha</label>
              <div className="gradient-border-input">
                {/* Ícone de cadeado */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-entrar">
              Cadastrar
            </button>
          </form>

          <div className="divider">
            <span>ou</span>
          </div>

          <button type="button" className="btn-google" onClick={handleGoogleAuth}>
            Cadastrar com o Google
          </button>

          <div className="register-wrapper">
            {/* Redireciona de volta para o login */}
            <Link to="/login" className="text-link secondary">
              Já tenho uma conta. Fazer Login
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