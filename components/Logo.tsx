type Props = { className?: string };

export default function Logo({ className }: Props) {
  // Vector logo: stylized N & Y intertwine, simple for now
  return (
    <svg className={className} viewBox="0 0 128 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nat & Ya Solutions logo">
      <rect x="1" y="1" width="126" height="46" rx="12" fill="url(#g)" stroke="rgba(255,255,255,0.7)"/>
      <path d="M20 34V14l14 20V14" stroke="#0B3D91" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M64 14c-6 0-10 4-10 10s4 10 10 10 10-4 10-10M72 14v20" stroke="#0B3D91" strokeWidth="4" strokeLinecap="round"/>
      <path d="M98 14l10 20M118 14l-10 20" stroke="#0B3D91" strokeWidth="4" strokeLinecap="round"/>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="128" y2="48">
          <stop offset="0%" stopColor="#FFD54A" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#B8D8FF" stopOpacity="0.25"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
