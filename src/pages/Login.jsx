import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../components/FormField';
import bgImage from '../assets/Imagem_Login.jpg';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = emailSchema.safeParse(form.email).success;
    const isPasswordValid = passwordSchema.safeParse(form.password).success;

    if (!isEmailValid || !isPasswordValid) return;

    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-white mb-8">
            Faça seu Login<span className="text-pink-500">.</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col">
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
            
            <div className="flex justify-end mb-6">
              <Link to="/esqueci-senha" className="text-sm text-pink-400 hover:text-pink-300">
                Esqueceu minha senha?
              </Link>
            </div>
            
            <button type="submit" className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold">
              Entrar
            </button>
          </form>

          <div className="flex items-center my-6 text-gray-500">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-sm font-medium">ou</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/cadastro" className="text-gray-400 hover:text-white">
              Ainda não tenho uma conta
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
}