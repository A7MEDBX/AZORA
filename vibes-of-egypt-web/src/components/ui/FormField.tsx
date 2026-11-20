import React from 'react';
import styles from './UI.module.css';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  helperText,
  className = '',
  children,
}) => {
  return (
    <div className={`${styles.formField} ${className}`}>
      {label && (
        <label className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.requiredStar}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.errorMessage}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};
