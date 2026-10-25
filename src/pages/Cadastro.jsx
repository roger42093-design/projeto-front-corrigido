import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../components/FormField';
import bgImage from '../assets/Imagem_Login.jpg';

export default function Cadastro() {
  const [basicInfo, setBasicInfo] = useState({ nome: "", email: "", password: "", confirmPassword: "" });
  const [additionalInfo, setAdditionalInfo] = useState({ telefone: "", cep: "", numero: "", foto: null });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isBasicInfo, setIsBasicInfo] = useState(true);
  const [confirmError, setConfirmError] = useState("");

  const nomeSchema = z.string().min(3, "O nome deve ter no mínimo 3 caracteres");
  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");
  const telefoneSchema = z.string().min(10, "Telefone inválido");
  const cepSchema = z.string().min(8, "CEP inválido");
  const numeroSchema = z.string().min(1, "Obrigatório");

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
    if (name === "confirmPassword" || name === "password") setConfirmError("");
  };

  const handleAdditionalChange = (e) => setAdditionalInfo({ ...additionalInfo, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalInfo({ ...additionalInfo, foto: file });
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (!nomeSchema.safeParse(basicInfo.nome).success || 
        !emailSchema.safeParse(basicInfo.email).success || 
        !passwordSchema.safeParse(basicInfo.password).success) return;

    if (basicInfo.password !== basicInfo.confirmPassword) {
      setConfirmError("As senhas não coincidem!");
      return;
    }
    setIsBasicInfo(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!telefoneSchema.safeParse(additionalInfo.telefone).success || 
        !cepSchema.safeParse(additionalInfo.cep).success || 
        !numeroSchema.safeParse(additionalInfo.numero).success) return;
        
    alert("Cadastro finalizado com sucesso!");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-white mb-8">
            Crie sua conta<span className="text-pink-500">.</span>
          </h1>

          {isBasicInfo ? (
            <div className="flex flex-col">
              <FormField label="Nome Completo" name="nome" value={basicInfo.nome} onChange={handleBasicChange} validation={nomeSchema} />
              <FormField label="Email" name="email" type="email" value={basicInfo.email} onChange={handleBasicChange} validation={emailSchema} />
              <FormField label="Senha" name="password" type="password" value={basicInfo.password} onChange={handleBasicChange} validation={passwordSchema} />
              <FormField label="Confirmar Senha" name="confirmPassword" type="password" value={basicInfo.confirmPassword} onChange={handleBasicChange} errorText={confirmError} />
              <button type="button" onClick={handleNext} className="w-full mt-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold">Próximo Passo</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <FormField label="Telefone" name="telefone" value={additionalInfo.telefone} onChange={handleAdditionalChange} validation={telefoneSchema} />
              <div className="flex gap-4">
                <div className="w-2/3"><FormField label="CEP" name="cep" value={additionalInfo.cep} onChange={handleAdditionalChange} validation={cepSchema} /></div>
                <div className="w-1/3"><FormField label="Número" name="numero" value={additionalInfo.numero} onChange={handleAdditionalChange} validation={numeroSchema} /></div>
              </div>
              <div className="flex flex-col w-full mb-6">
                <label className="mb-1 text-sm font-medium text-gray-200">Foto de Perfil</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white cursor-pointer" />
                {fotoPreview && <img src={fotoPreview} alt="Preview" className="mt-4 w-24 h-24 rounded-full mx-auto object-cover border-2 border-pink-500" />}
              </div>
              <div className="flex gap-4 mt-2">
                <button type="button" onClick={() => setIsBasicInfo(true)} className="w-1/3 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold">Voltar</button>
                <button type="submit" className="w-2/3 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold">Finalizar Cadastro</button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-gray-400 hover:text-white">Já tenho uma conta. Fazer Login</Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
}