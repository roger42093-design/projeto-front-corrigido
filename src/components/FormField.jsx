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
    onChange(e);

    if (validation) {
      const result = validation.safeParse(e.target.value);
      if (!result.success) {
        setLocalError(result.error.issues[0].message);
      } else {
        setLocalError("");
      }
    }
  };

  const displayError = errorText || localError;

  return (
    <div className="flex flex-col w-full mb-4">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border transition-all duration-300 focus:outline-none focus:ring-2 ${
            displayError 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:border-pink-500 focus:ring-pink-500/50'
          }`}
        />
      </div>
      {displayError && (
        <span className="mt-1 text-xs text-red-400 font-medium">
          {displayError}
        </span>
      )}
    </div>
  );
};