"use client";
import Image from 'next/image';
import { useState } from 'react';
import Logo from './Logo';

export default function BrandMark({ size = 40 }: { size?: number }) {
  const [errored, setErrored] = useState(false);
  if (!errored) {
    return (
      <Image
        src="/logo.jpg"
        alt="Nat & Ya Solutions logo"
        width={size}
        height={size}
        className="rounded-xl border border-white/70 shadow-soft object-cover"
        onError={() => setErrored(true)}
        priority
      />
    );
  }
  return <Logo className="w-[120px] h-[44px]" />;
}
