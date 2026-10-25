import React, { useState } from 'react';

export const FormField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  validation,
  errorText
}) => {
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    // Atualiza o estado no componente pai (Login ou Cadastro)
    onChange(e); 

    // Valida o valor com o Zod em tempo real
    if (validation) {
      const result = validation.safeParse(e.target.value);
      if (!result.success) {
        setLocalError(result.error.issues[0].message);
      } else {
        setLocalError("");
      }
    }
  };

  // Dá prioridade a erros forçados pelo pai (ex: senhas não coincidem)
  const displayError = errorText || localError;

  return (
    <div className="input-block">
      <label>{label}</label>
      <div 
        className="gradient-border-input" 
        style={{ borderColor: displayError ? '#ff3b6b' : 'transparent' }}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      {displayError && (
        <span style={{ color: '#ff3b6b', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
          {displayError}
        </span>
      )}
    </div>
  );
};