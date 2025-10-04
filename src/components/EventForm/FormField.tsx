import React, { memo, useCallback } from 'react';
import type { FormFieldProps } from '../../types';

const FormField: React.FC<FormFieldProps> = memo(({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false, 
  placeholder,
  error,
  isValid
}) => {
  const getInputClassName = useCallback(() => {
    let className = 'form-input';
    if (error) {
      className += ' form-input-error';
    } else if (isValid) {
      className += ' form-input-valid';
    }
    return className;
  }, [error, isValid]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

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
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;