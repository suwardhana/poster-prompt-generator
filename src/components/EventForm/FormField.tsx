import React from 'react';
import type { FormFieldProps } from '../../types';

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false, 
  placeholder,
  error,
  isValid
}) => {
  const getInputClassName = () => {
    let className = 'form-input';
    if (error) {
      className += ' form-input-error';
    } else if (isValid) {
      className += ' form-input-valid';
    }
    return className;
  };

  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      <input 
        className={getInputClassName()}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormField;