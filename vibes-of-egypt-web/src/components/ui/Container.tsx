import React from 'react';
import styles from './UI.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'standard' | 'narrow' | 'wide' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'standard',
  className = '',
  ...props
}) => {
  const sizeClass = styles[size] || styles.standard;
  return (
    <div className={`${styles.container} ${sizeClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
