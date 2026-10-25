import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../components/FormField';
import './Login.css'; 
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function LoginFormComponent(props) {
  const [form, setForm] = useState({ email: "", password: "" });

  // 1. Definição das regras de validação com Zod
  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const simularEnvioServidor = (event) => {
    event.preventDefault();
    console.log('Enviando dados para o servidor...', form);
    alert(`Dados capturados!\nEmail: ${form.email}\nSenha: ${form.password}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="form-content">
          <h1 className="title">
            Faça seu Login<span className="pink-dot">.</span>
          </h1>

          <form onSubmit={simularEnvioServidor}>
            {/* 2. Substituição do HTML pelo FormField */}
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="exemplo@email.com"
              value={form.email}
              onChange={handleChange}
              validation={emailSchema}
            />
            
            <FormField
              label="Senha"
              name="password"
              type="password"
              placeholder="Sua senha secreta"
              value={form.password}
              onChange={handleChange}
              validation={passwordSchema}
            />
            
            <div className="forgot-link-wrapper">
              <Link to="/esqueci-senha" className="text-link">Esqueceu minha senha</Link>
            </div>
            
            <button type="submit" className="btn-entrar">
              Entrar
            </button>
          </form>

          <div className="divider">
            <span>ou</span>
          </div>

          <button type="button" className="btn-google">
            {/* SVG do Google mantido */}
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar com o Google
          </button>

          <div className="register-wrapper">
            <Link to="/cadastro" className="text-link secondary">
              Ainda não tenho uma conta
            </Link>
          </div>
        </div>
      </div>

      <div className="login-right" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="dark-fade"></div>
      </div>
    </div>
  );
}