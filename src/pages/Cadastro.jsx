import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../shared/components/FormField';
import { authService } from '../services/authService';
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function RegisterFormComponent(props) {
  const [basicInfo, setBasicInfo] = useState({ nome: "", email: "", password: "", confirmPassword: "" });
  const [additionalInfo, setAdditionalInfo] = useState({ telefone: "", cep: "", numero: "", foto: null });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isBasicInfo, setIsBasicInfo] = useState(true);
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    nome: "", email: "", password: "", confirmPassword: "", telefone: "", cep: "", numero: ""
  });

  const nomeSchema = z.string().min(3, "O nome deve ter no mínimo 3 caracteres");
  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");
  const telefoneSchema = z.string().min(9, "Telefone inválido");
  const cepSchema = z.string().min(8, "CEP inválido");
  const numeroSchema = z.string().min(1, "Obrigatório");

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "confirmPassword" || name === "password") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo({ ...additionalInfo, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalInfo({ ...additionalInfo, foto: file });
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    const nomeRes = nomeSchema.safeParse(basicInfo.nome);
    const emailRes = emailSchema.safeParse(basicInfo.email);
    const passRes = passwordSchema.safeParse(basicInfo.password);
    const senhasIguais = basicInfo.password === basicInfo.confirmPassword && basicInfo.confirmPassword !== "";

    if (!nomeRes.success || !emailRes.success || !passRes.success || !senhasIguais) {
      setErrors((prev) => ({
        ...prev,
        nome: !nomeRes.success ? nomeRes.error.issues[0].message : "",
        email: !emailRes.success ? emailRes.error.issues[0].message : "",
        password: !passRes.success ? passRes.error.issues[0].message : "",
        confirmPassword: !senhasIguais ? "As senhas não coincidem!" : ""
      }));
      return;
    }

    setIsBasicInfo(false);
  };

  const handleBack = () => setIsBasicInfo(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const telRes = telefoneSchema.safeParse(additionalInfo.telefone);
    const cepRes = cepSchema.safeParse(additionalInfo.cep);
    const numRes = numeroSchema.safeParse(additionalInfo.numero);

    if (!telRes.success || !cepRes.success || !numRes.success) {
      setErrors((prev) => ({
        ...prev,
        telefone: !telRes.success ? telRes.error.issues[0].message : "",
        cep: !cepRes.success ? cepRes.error.issues[0].message : "",
        numero: !numRes.success ? numRes.error.issues[0].message : ""
      }));
      return;
    }

    try {
      await authService.register({
        nome: basicInfo.nome,
        email: basicInfo.email,
        password: basicInfo.password
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

          {isBasicInfo ? (
            <div>
              <FormField label="Nome Completo" name="nome" type="text" placeholder="Seu nome" value={basicInfo.nome} onChange={handleBasicChange} validation={nomeSchema} errorText={errors.nome} />
              <FormField label="Email" name="email" type="email" placeholder="exemplo@email.com" value={basicInfo.email} onChange={handleBasicChange} validation={emailSchema} errorText={errors.email} />
              <FormField label="Senha" name="password" type="password" placeholder="Sua senha secreta" value={basicInfo.password} onChange={handleBasicChange} validation={passwordSchema} errorText={errors.password} />
              <FormField label="Confirmar Senha" name="confirmPassword" type="password" placeholder="Repita a senha" value={basicInfo.confirmPassword} onChange={handleBasicChange} errorText={errors.confirmPassword} />

              <button type="button" onClick={handleNext} className="w-full rounded-lg bg-gradient-to-r from-[#be123c] to-[#4338ca] text-white text-[1.1rem] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none" style={{ padding: '14px', marginTop: '1.5rem' }}>
                Próximo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormField label="Telefone" name="telefone" type="text" placeholder="(00) 00000-0000" value={additionalInfo.telefone} onChange={handleAdditionalChange} validation={telefoneSchema} errorText={errors.telefone} />

              <div className="flex" style={{ gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <FormField label="CEP" name="cep" type="text" placeholder="00000-000" value={additionalInfo.cep} onChange={handleAdditionalChange} validation={cepSchema} errorText={errors.cep} />
                </div>
                <div style={{ flex: 1 }}>
                  <FormField label="Número" name="numero" type="text" placeholder="123" value={additionalInfo.numero} onChange={handleAdditionalChange} validation={numeroSchema} errorText={errors.numero} />
                </div>
              </div>

              <div className="text-left" style={{ marginBottom: '1.5rem' }}>
                <label className="block text-sm font-medium text-[#ccc]" style={{ marginBottom: '0.5rem' }}>
                  Foto de Perfil
                </label>
                <div className="rounded-lg flex items-center" style={{ background: 'linear-gradient(#050505, #050505) padding-box, linear-gradient(90deg, #1e3a8a, #be123c) border-box', border: '2px solid transparent', padding: '8px 12px' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#1e3a8a] file:text-white hover:file:bg-[#be123c] file:cursor-pointer cursor-pointer" />
                </div>
                {fotoPreview && (
                  <div className="flex justify-center" style={{ marginTop: '15px' }}>
                    <img src={fotoPreview} alt="Pré-visualização" className="w-[90px] h-[90px] rounded-full object-cover border-2 border-[#be123c]" />
                  </div>
                )}
              </div>

              <div className="flex" style={{ gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" onClick={handleBack} className="rounded-lg bg-[#374151] text-white text-[1.1rem] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none" style={{ flex: 1, padding: '14px' }}>
                  Voltar
                </button>
                <button type="submit" className="rounded-lg bg-gradient-to-r from-[#be123c] to-[#4338ca] text-white text-[1.1rem] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none" style={{ flex: 2, padding: '14px' }}>
                  Finalizar Cadastro
                </button>
              </div>
            </form>
          )}

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