import { type ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
  threshold?: number;
}

export default function Reveal({ children, className = '', delay, threshold = 0.15 }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}
