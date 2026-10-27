import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import bgImage from '../../assets/Imagem_Login.jpg'; 

import { FormField } from '../../shared/components/FormField';
import { authService } from '../../shared/services/authService';

export default function RegisterFormComponent(props) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cep: "",
    numero: "",
    foto: null
  });
  const [fotoPreview, setFotoPreview] = useState(null);
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    nome: "",
    telefone: "",
    cep: "",
    numero: ""
  });

  const nomeSchema = z.string().min(3, "O nome deve ter no mínimo 3 caracteres");
  const telefoneSchema = z.string().min(9, "Telefone inválido");
  const cepSchema = z.string().min(8, "CEP inválido");
  const numeroSchema = z.string().min(1, "Obrigatório");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }));
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nomeRes = nomeSchema.safeParse(formData.nome);
    const telRes = telefoneSchema.safeParse(formData.telefone);
    const cepRes = cepSchema.safeParse(formData.cep);
    const numRes = numeroSchema.safeParse(formData.numero);

    if (!nomeRes.success || !telRes.success || !cepRes.success || !numRes.success) {
      setErrors({
        nome: !nomeRes.success ? nomeRes.error.issues[0].message : "",
        telefone: !telRes.success ? telRes.error.issues[0].message : "",
        cep: !cepRes.success ? cepRes.error.issues[0].message : "",
        numero: !numRes.success ? numRes.error.issues[0].message : ""
      });
      return;
    }

    try {
      await authService.register({
        nome: formData.nome,
        telefone: formData.telefone,
        cep: formData.cep,
        numero: formData.numero,
        // Se precisar enviar a foto ou outros dados para o backend, eles já estão em formData
      });

      alert("Cadastro realizado com sucesso! Faça seu login.");
      navigate('/login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao finalizar o cadastro no servidor.");
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-[#050505] text-white font-sans">
      <div className="w-full md:w-[45%] bg-[#050505] flex flex-col justify-center items-center relative z-10" style={{ padding: '2rem' }}>
        <div className="w-full max-w-[400px]">
          <h1 className="text-4xl sm:text-[2.8rem] font-bold text-left text-white leading-tight" style={{ marginBottom: '2.5rem' }}>
            Crie sua conta<span className="text-[#ff3b6b]">.</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <FormField 
              label="Nome Completo" 
              name="nome" 
              type="text" 
              placeholder="Seu nome" 
              value={formData.nome} 
              onChange={handleChange} 
              validation={nomeSchema} 
              errorText={errors.nome} 
            />

            <FormField 
              label="Telefone" 
              name="telefone" 
              type="text" 
              placeholder="(00) 00000-0000" 
              value={formData.telefone} 
              onChange={handleChange} 
              validation={telefoneSchema} 
              errorText={errors.telefone} 
            />

            <div className="flex" style={{ gap: '10px' }}>
              <div style={{ flex: 2 }}>
                <FormField 
                  label="CEP" 
                  name="cep" 
                  type="text" 
                  placeholder="00000-000" 
                  value={formData.cep} 
                  onChange={handleChange} 
                  validation={cepSchema} 
                  errorText={errors.cep} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <FormField 
                  label="Número" 
                  name="numero" 
                  type="text" 
                  placeholder="123" 
                  value={formData.numero} 
                  onChange={handleChange} 
                  validation={numeroSchema} 
                  errorText={errors.numero} 
                />
              </div>
            </div>

            <div className="text-left" style={{ marginBottom: '1.5rem' }}>
              <label className="block text-sm font-medium text-[#ccc]" style={{ marginBottom: '0.5rem' }}>
                Foto de Perfil
              </label>
              <div className="rounded-lg flex items-center" style={{ background: 'linear-gradient(#050505, #050505) padding-box, linear-gradient(90deg, #1e3a8a, #be123c) border-box', border: '2px solid transparent', padding: '8px 12px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1e3a8a] file:text-white hover:file:bg-[#be123c] file:cursor-pointer cursor-pointer" 
                />
              </div>
              {fotoPreview && (
                <div className="flex justify-center" style={{ marginTop: '15px' }}>
                  <img src={fotoPreview} alt="Pré-visualização" className="w-[90px] h-[90px] rounded-full object-cover border-2 border-[#be123c]" />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full rounded-lg bg-gradient-to-r from-[#be123c] to-[#4338ca] text-white text-[1.1rem] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none" 
              style={{ padding: '14px', marginTop: '1.5rem' }}
            >
              Finalizar Cadastro
            </button>
          </form>

          <div className="flex items-center text-center text-[#6b7280] before:content-[''] before:flex-1 before:border-b before:border-[#1f2937] after:content-[''] after:flex-1 after:border-b after:border-[#1f2937]" style={{ margin: '1.5rem 0' }}>
            <span style={{ padding: '0 15px', fontSize: '0.9rem' }} className="lowercase">ou</span>
          </div>

          <div className="text-center" style={{ marginTop: '1rem' }}>
            <Link to="/login" className="text-[#d1d5db] text-[0.85rem] hover:underline">
              Já tenho uma conta. Fazer Login
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute top-0 left-0 w-[250px] h-full bg-gradient-to-r from-[#050505] to-transparent"></div>
      </div>
    </div>
  );
}