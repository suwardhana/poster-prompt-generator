import React, { ReactNode } from 'react';
import './GlassContainer.css';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  pulse?: boolean;
  onClick?: () => void;
  'data-testid'?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({ 
  children, 
  className = '', 
  pulse = false,
  onClick,
  'data-testid': testId
}) => {
  const containerClasses = [
    'glass-container',
    pulse ? 'pulse' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default GlassContainer;