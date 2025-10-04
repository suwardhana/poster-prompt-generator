import React, { memo, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import './GlassContainer.css';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  pulse?: boolean;
  onClick?: () => void;
  'data-testid'?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = memo(({ 
  children, 
  className = '', 
  pulse = false,
  onClick,
  'data-testid': testId
}) => {
  const containerClasses = useMemo(() => [
    'glass-container',
    pulse ? 'pulse' : '',
    className
  ].filter(Boolean).join(' '), [pulse, className]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {children}
    </div>
  );
});

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;