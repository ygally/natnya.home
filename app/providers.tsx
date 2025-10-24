"use client";
import { useEffect } from 'react';
import { playRetroAnimation } from './retro';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initAnimation = () => {
      const canvas = document.getElementById('retroCanvas') as HTMLCanvasElement | null;
      if (canvas) {
        playRetroAnimation(canvas);
      }
    };

    initAnimation();
    const timeout = setTimeout(initAnimation, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  return <>{children}</>;
}
