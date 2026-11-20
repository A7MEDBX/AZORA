import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UI.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  to,
  href,
  ...props
}) => {
  const variantClass = styles[variant] || styles.primary;
  const sizeClass = size === 'sm' ? styles.btnSm : size === 'lg' ? styles.btnLg : styles.btnMd;
  const fullWidthClass = fullWidth ? styles.btnFull : '';
  const combinedClasses = `${styles.btn} ${variantClass} ${sizeClass} ${fullWidthClass} ${className}`.trim();

  const destination = to || href;

  if (destination) {
    if (destination.startsWith('http') || destination.startsWith('mailto:') || destination.startsWith('tel:')) {
      return (
        <a href={destination} className={combinedClasses} target={props.target} rel={props.rel}>
          {children}
        </a>
      );
    }
    return (
      <Link to={destination} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
