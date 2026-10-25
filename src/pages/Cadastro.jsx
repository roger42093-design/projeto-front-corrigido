import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { FormField } from '../components/FormField';
import './Login.css'; 
import bgImage from '../assets/Imagem_Login.jpg'; 

export default function RegisterFormComponent(props) {
  const [basicInfo, setBasicInfo] = useState({ nome: "", email: "", password: "", confirmPassword: "" });
  const [additionalInfo, setAdditionalInfo] = useState({ telefone: "", cep: "", numero: "", foto: null });
  const [fotoPreview, setFotoPreview] = useState(null);
  const [isBasicInfo, setIsBasicInfo] = useState(true);
  const [confirmError, setConfirmError] = useState("");

  // Esquemas de validação Zod
  const nomeSchema = z.string().min(3, "O nome deve ter no mínimo 3 caracteres");
  const emailSchema = z.string().email("Formato de email inválido");
  const passwordSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres");
  const telefoneSchema = z.string().min(9, "Telefone inválido");
  const cepSchema = z.string().min(8, "CEP inválido");
  const numeroSchema = z.string().min(1, "Obrigatório");

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
    if (name === "confirmPassword" || name === "password") {
      setConfirmError("");
    }
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo({ ...additionalInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalInfo({ ...additionalInfo, foto: file });
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (basicInfo.password !== basicInfo.confirmPassword) {
      setConfirmError("As senhas não coincidem!");
      return;
    }
    setIsBasicInfo(false);
  };

  const handleBack = () => {
    setIsBasicInfo(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const dadosUsuario = {
      nome: basicInfo.nome,
      email: basicInfo.email,
      password: basicInfo.password,
      telefone: additionalInfo.telefone,
      cep: additionalInfo.cep,
      numero: additionalInfo.numero
    };

    formData.append("dadosUsuario", JSON.stringify(dadosUsuario));
    
    if (additionalInfo.foto) {
      formData.append("foto", additionalInfo.foto);
    }

    console.log("FormData preparado para envio:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    alert("Cadastro finalizado! Verifique a consola.");
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="form-content">
          <h1 className="title">
            Crie sua conta<span className="pink-dot">.</span>
          </h1>

          {isBasicInfo ? (
            <div className="form-step">
              <FormField
                label="Nome Completo"
                name="nome"
                type="text"
                placeholder="Seu nome"
                value={basicInfo.nome}
                onChange={handleBasicChange}
                validation={nomeSchema}
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                value={basicInfo.email}
                onChange={handleBasicChange}
                validation={emailSchema}
              />

              <FormField
                label="Senha"
                name="password"
                type="password"
                placeholder="Sua senha secreta"
                value={basicInfo.password}
                onChange={handleBasicChange}
                validation={passwordSchema}
              />

              <FormField
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={basicInfo.confirmPassword}
                onChange={handleBasicChange}
                errorText={confirmError}
              />

              <button type="button" className="btn-entrar" onClick={handleNext}>
                Próximo
              </button>
            </div>
          ) : (
            <form className="form-step" onSubmit={handleSubmit}>
              <FormField
                label="Telefone"
                name="telefone"
                type="text"
                placeholder="(00) 00000-0000"
                value={additionalInfo.telefone}
                onChange={handleAdditionalChange}
                validation={telefoneSchema}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <FormField
                    label="CEP"
                    name="cep"
                    type="text"
                    placeholder="00000-000"
                    value={additionalInfo.cep}
                    onChange={handleAdditionalChange}
                    validation={cepSchema}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <FormField
                    label="Número"
                    name="numero"
                    type="text"
                    placeholder="123"
                    value={additionalInfo.numero}
                    onChange={handleAdditionalChange}
                    validation={numeroSchema}
                  />
                </div>
              </div>

              <div className="input-block">
                <label>Foto de Perfil</label>
                <div className="gradient-border-input" style={{ padding: '8px' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ padding: 0 }} />
                </div>
                {fotoPreview && (
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <img 
                      src={fotoPreview} 
                      alt="Pré-visualização" 
                      style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #be123c' }} 
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" className="btn-entrar" style={{ background: '#374151', flex: 1 }} onClick={handleBack}>
                  Voltar
                </button>
                <button type="submit" className="btn-entrar" style={{ flex: 2, marginTop: 0 }}>
                  Finalizar Cadastro
                </button>
              </div>
            </form>
          )}

          <div className="divider">
            <span>ou</span>
          </div>

          <div className="register-wrapper" style={{ marginTop: '1rem' }}>
            <Link to="/login" className="text-link secondary">
              Já tenho uma conta. Fazer Login
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