import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthContext } from '../contexts/AuthContext';
// Importação atualizada vindo de src/shared/components
import { FormField } from '../shared/components/FormField';
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function LoginFormComponent(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Definição das regras de validação com Zod
  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const simularEnvioServidor = (event) => {
    event.preventDefault();

    const emailResult = emailSchema.safeParse(form.email);
    const passwordResult = passwordSchema.safeParse(form.password);

    if (!emailResult.success || !passwordResult.success) {
      setErrors({
        email: !emailResult.success ? emailResult.error.issues[0].message : "",
        password: !passwordResult.success ? passwordResult.error.issues[0].message : ""
      });
      return;
    }

    console.log('Enviando dados para o servidor...', form);
    login("meu-token-jwt-simulado");
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#050505] text-white font-sans">
      {/* PAINEL ESQUERDO */}
      <div 
        className="w-full md:w-[45%] bg-[#050505] flex flex-col justify-center items-center relative z-10"
        style={{ padding: '2rem' }}
      >
        <div className="w-full max-w-[400px]">
          <h1 
            className="text-4xl sm:text-[2.8rem] font-bold text-left text-white leading-tight"
            style={{ marginBottom: '2.5rem' }}
          >
            Faça seu Login<span className="text-[#ff3b6b]">.</span>
          </h1>

          <form onSubmit={simularEnvioServidor}>
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="exemplo@email.com"
              value={form.email}
              onChange={handleChange}
              validation={emailSchema}
              errorText={errors.email}
            />
            
            <FormField
              label="Senha"
              name="password"
              type="password"
              placeholder="Sua senha secreta"
              value={form.password}
              onChange={handleChange}
              validation={passwordSchema}
              errorText={errors.password}
            />
            
            <div className="flex justify-end" style={{ marginTop: '8px' }}>
              <Link to="/esqueci-senha" className="text-[#3b82f6] text-[0.85rem] hover:underline">
                Esqueceu minha senha
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="w-full rounded-lg bg-gradient-to-r from-[#be123c] to-[#4338ca] text-white text-[1.1rem] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none"
              style={{ padding: '14px', marginTop: '1.5rem' }}
            >
              Entrar
            </button>
          </form>

          {/* DIVISOR "OU" */}
          <div 
            className="flex items-center text-center text-[#6b7280] before:content-[''] before:flex-1 before:border-b before:border-[#1f2937] after:content-[''] after:flex-1 after:border-b after:border-[#1f2937]"
            style={{ margin: '1.5rem 0' }}
          >
            <span style={{ padding: '0 15px', fontSize: '0.9rem' }} className="lowercase">ou</span>
          </div>

          {/* BOTÃO GOOGLE */}
          <button 
            type="button" 
            className="w-full flex items-center justify-center bg-transparent border border-[#374151] rounded-lg text-[#e5e7eb] text-base font-medium cursor-pointer transition-all duration-200 hover:bg-[#111827] hover:border-[#4b5563]"
            style={{ padding: '12px', gap: '12px' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar com o Google
          </button>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/cadastro" className="text-[#d1d5db] text-[0.85rem] hover:underline">
              Ainda não tenho uma conta
            </Link>
          </div>
        </div>
      </div>

      {/* PAINEL DIREITO (Imagem) */}
      <div 
        className="hidden md:block flex-1 bg-cover bg-center bg-no-repeat relative" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute top-0 left-0 w-[250px] h-full bg-gradient-to-r from-[#050505] to-transparent"></div>
      </div>
    </div>
  );
}