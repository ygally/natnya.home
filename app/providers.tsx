"use client";
import { useEffect } from 'react';
import { playRetroAnimation } from './retro';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const canvas = document.getElementById('retroCanvas') as HTMLCanvasElement | null;
    if (canvas) {
      playRetroAnimation(canvas);
    }
  }, []);
  return <>{children}</>;
}
