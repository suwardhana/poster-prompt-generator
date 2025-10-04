import React from 'react';
import type { FormFieldProps } from '../../types';

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false, 
  placeholder 
}) => {
  // Component implementation will be added in later tasks
  return (
    <div className="form-field">
      <label>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;