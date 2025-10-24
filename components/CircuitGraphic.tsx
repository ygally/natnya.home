type Props = { className?: string };

export default function CircuitGraphic({ className }: Props) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Circuit board graphic"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8D8FF" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FFD54A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0B3D91" stopOpacity="0.2" />
        </linearGradient>
        
        {/* Glow effect for nodes */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect width="200" height="200" fill="url(#circuitGrad)" rx="8"/>
      
      {/* Complex chaotic circuit traces - multiple parallel lines */}
      {/* Horizontal bus lines */}
      <path d="M10 25 L190 25" stroke="#00D9FF" strokeWidth="1.5"/>
      <path d="M10 28 L190 28" stroke="#FF6B35" strokeWidth="1"/>
      <path d="M10 31 L190 31" stroke="#FFD54A" strokeWidth="1"/>
      
      <path d="M10 60 L190 60" stroke="#B8D8FF" strokeWidth="1.5"/>
      <path d="M10 63 L190 63" stroke="#00FF88" strokeWidth="1"/>
      <path d="M10 66 L190 66" stroke="#FF1493" strokeWidth="1"/>
      
      <path d="M10 135 L190 135" stroke="#FFD54A" strokeWidth="1.5"/>
      <path d="M10 138 L190 138" stroke="#00D9FF" strokeWidth="1"/>
      <path d="M10 141 L190 141" stroke="#B8D8FF" strokeWidth="1"/>
      
      <path d="M10 170 L190 170" stroke="#FF6B35" strokeWidth="1.5"/>
      <path d="M10 173 L190 173" stroke="#00FF88" strokeWidth="1"/>
      <path d="M10 176 L190 176" stroke="#0B3D91" strokeWidth="1"/>
      
      {/* Vertical bus lines */}
      <path d="M25 10 L25 190" stroke="#FFD54A" strokeWidth="1.5"/>
      <path d="M28 10 L28 190" stroke="#B8D8FF" strokeWidth="1"/>
      <path d="M31 10 L31 190" stroke="#00FF88" strokeWidth="1"/>
      
      <path d="M60 10 L60 190" stroke="#00D9FF" strokeWidth="1.5"/>
      <path d="M63 10 L63 190" stroke="#FF1493" strokeWidth="1"/>
      
      <path d="M140 10 L140 190" stroke="#FF6B35" strokeWidth="1.5"/>
      <path d="M143 10 L143 190" stroke="#FFD54A" strokeWidth="1"/>
      
      <path d="M175 10 L175 190" stroke="#B8D8FF" strokeWidth="1.5"/>
      <path d="M178 10 L178 190" stroke="#00FF88" strokeWidth="1"/>
      
      {/* Chaotic curved connections to central chip */}
      <path d="M40 40 Q60 70 75 85" stroke="#00D9FF" strokeWidth="2" fill="none"/>
      <path d="M40 42 Q58 72 73 87" stroke="#FFD54A" strokeWidth="1.5" fill="none"/>
      
      <path d="M160 40 Q140 70 125 85" stroke="#FF6B35" strokeWidth="2" fill="none"/>
      <path d="M162 42 Q142 68 127 83" stroke="#00FF88" strokeWidth="1.5" fill="none"/>
      
      <path d="M24 100 L70 100" stroke="#FF1493" strokeWidth="2"/>
      <path d="M24 103 L68 103" stroke="#00D9FF" strokeWidth="1.5"/>
      
      <path d="M176 100 L130 100" stroke="#FFD54A" strokeWidth="2"/>
      <path d="M176 97 L132 97" stroke="#B8D8FF" strokeWidth="1.5"/>
      
      <path d="M40 160 Q60 130 75 115" stroke="#00FF88" strokeWidth="2" fill="none"/>
      <path d="M42 162 Q62 132 77 117" stroke="#FF6B35" strokeWidth="1.5" fill="none"/>
      
      <path d="M160 160 Q140 130 125 115" stroke="#B8D8FF" strokeWidth="2" fill="none"/>
      <path d="M158 162 Q138 132 123 117" stroke="#00D9FF" strokeWidth="1.5" fill="none"/>
      
      {/* Interconnections between peripheral chips */}
      <path d="M50 50 L50 85" stroke="#FFD54A" strokeWidth="1.5"/>
      <path d="M150 50 L150 85" stroke="#00D9FF" strokeWidth="1.5"/>
      <path d="M50 115 L50 150" stroke="#FF6B35" strokeWidth="1.5"/>
      <path d="M150 115 L150 150" stroke="#00FF88" strokeWidth="1.5"/>
      
      <path d="M50 40 L150 40" stroke="#B8D8FF" strokeWidth="1.5"/>
      <path d="M50 160 L150 160" stroke="#FF1493" strokeWidth="1.5"/>
      
      {/* Diagonal cross connections */}
      <path d="M50 50 L150 150" stroke="#00D9FF" strokeWidth="1" opacity="0.6"/>
      <path d="M150 50 L50 150" stroke="#FFD54A" strokeWidth="1" opacity="0.6"/>
      
      {/* Connection nodes - vivid colors with glow */}
      <circle cx="25" cy="25" r="2.5" fill="#00D9FF" filter="url(#glow)"/>
      <circle cx="60" cy="25" r="2.5" fill="#FF6B35" filter="url(#glow)"/>
      <circle cx="140" cy="25" r="2.5" fill="#FFD54A" filter="url(#glow)"/>
      <circle cx="175" cy="25" r="2.5" fill="#00FF88" filter="url(#glow)"/>
      
      <circle cx="25" cy="60" r="2.5" fill="#FF1493" filter="url(#glow)"/>
      <circle cx="60" cy="60" r="2.5" fill="#B8D8FF" filter="url(#glow)"/>
      <circle cx="140" cy="60" r="2.5" fill="#00D9FF" filter="url(#glow)"/>
      <circle cx="175" cy="60" r="2.5" fill="#FFD54A" filter="url(#glow)"/>
      
      <circle cx="25" cy="135" r="2.5" fill="#00FF88" filter="url(#glow)"/>
      <circle cx="60" cy="135" r="2.5" fill="#FF6B35" filter="url(#glow)"/>
      <circle cx="140" cy="135" r="2.5" fill="#B8D8FF" filter="url(#glow)"/>
      <circle cx="175" cy="135" r="2.5" fill="#00D9FF" filter="url(#glow)"/>
      
      <circle cx="25" cy="170" r="2.5" fill="#FFD54A" filter="url(#glow)"/>
      <circle cx="60" cy="170" r="2.5" fill="#FF1493" filter="url(#glow)"/>
      <circle cx="140" cy="170" r="2.5" fill="#00FF88" filter="url(#glow)"/>
      <circle cx="175" cy="170" r="2.5" fill="#FF6B35" filter="url(#glow)"/>
      
      {/* Mid-trace nodes */}
      <circle cx="55" cy="70" r="2" fill="#FFD54A" filter="url(#glow)"/>
      <circle cx="145" cy="70" r="2" fill="#00D9FF" filter="url(#glow)"/>
      <circle cx="55" cy="130" r="2" fill="#FF6B35" filter="url(#glow)"/>
      <circle cx="145" cy="130" r="2" fill="#00FF88" filter="url(#glow)"/>
      <circle cx="55" cy="100" r="2" fill="#B8D8FF" filter="url(#glow)"/>
      <circle cx="145" cy="100" r="2" fill="#FF1493" filter="url(#glow)"/>
      
      {/* CENTRAL CHIP - Large and prominent with vivid colors */}
      <rect x="75" y="75" width="50" height="50" fill="#0B3D91" stroke="#00D9FF" strokeWidth="3" rx="3" filter="url(#strongGlow)"/>
      <rect x="82" y="82" width="36" height="36" fill="#FFD54A" rx="2"/>
      <rect x="90" y="90" width="20" height="20" fill="#FF6B35" opacity="0.6" rx="1"/>
      <circle cx="100" cy="100" r="5" fill="#00D9FF" filter="url(#glow)"/>
      
      {/* Central chip pins - left */}
      <line x1="75" y1="82" x2="68" y2="82" stroke="#00D9FF" strokeWidth="2"/>
      <line x1="75" y1="88" x2="68" y2="88" stroke="#FFD54A" strokeWidth="2"/>
      <line x1="75" y1="94" x2="68" y2="94" stroke="#FF6B35" strokeWidth="2"/>
      <line x1="75" y1="100" x2="68" y2="100" stroke="#00FF88" strokeWidth="2"/>
      <line x1="75" y1="106" x2="68" y2="106" stroke="#FF1493" strokeWidth="2"/>
      <line x1="75" y1="112" x2="68" y2="112" stroke="#B8D8FF" strokeWidth="2"/>
      <line x1="75" y1="118" x2="68" y2="118" stroke="#00D9FF" strokeWidth="2"/>
      
      {/* Central chip pins - right */}
      <line x1="125" y1="82" x2="132" y2="82" stroke="#FFD54A" strokeWidth="2"/>
      <line x1="125" y1="88" x2="132" y2="88" stroke="#FF6B35" strokeWidth="2"/>
      <line x1="125" y1="94" x2="132" y2="94" stroke="#00FF88" strokeWidth="2"/>
      <line x1="125" y1="100" x2="132" y2="100" stroke="#00D9FF" strokeWidth="2"/>
      <line x1="125" y1="106" x2="132" y2="106" stroke="#FF1493" strokeWidth="2"/>
      <line x1="125" y1="112" x2="132" y2="112" stroke="#B8D8FF" strokeWidth="2"/>
      <line x1="125" y1="118" x2="132" y2="118" stroke="#FFD54A" strokeWidth="2"/>
      
      {/* Central chip pins - top */}
      <line x1="82" y1="75" x2="82" y2="68" stroke="#00FF88" strokeWidth="2"/>
      <line x1="90" y1="75" x2="90" y2="68" stroke="#FF1493" strokeWidth="2"/>
      <line x1="100" y1="75" x2="100" y2="68" stroke="#00D9FF" strokeWidth="2"/>
      <line x1="110" y1="75" x2="110" y2="68" stroke="#FFD54A" strokeWidth="2"/>
      <line x1="118" y1="75" x2="118" y2="68" stroke="#FF6B35" strokeWidth="2"/>
      
      {/* Central chip pins - bottom */}
      <line x1="82" y1="125" x2="82" y2="132" stroke="#FF6B35" strokeWidth="2"/>
      <line x1="90" y1="125" x2="90" y2="132" stroke="#00D9FF" strokeWidth="2"/>
      <line x1="100" y1="125" x2="100" y2="132" stroke="#00FF88" strokeWidth="2"/>
      <line x1="110" y1="125" x2="110" y2="132" stroke="#FF1493" strokeWidth="2"/>
      <line x1="118" y1="125" x2="118" y2="132" stroke="#B8D8FF" strokeWidth="2"/>
      
      {/* Small chip 1 - top left */}
      <rect x="30" y="30" width="20" height="20" fill="#0B3D91" stroke="#00D9FF" strokeWidth="2" rx="2"/>
      <rect x="35" y="35" width="10" height="10" fill="#FF6B35" rx="1"/>
      <circle cx="40" cy="40" r="2" fill="#FFD54A" filter="url(#glow)"/>
      <line x1="30" y1="35" x2="24" y2="35" stroke="#00D9FF" strokeWidth="1.5"/>
      <line x1="30" y1="40" x2="24" y2="40" stroke="#FFD54A" strokeWidth="1.5"/>
      <line x1="30" y1="45" x2="24" y2="45" stroke="#00FF88" strokeWidth="1.5"/>
      <line x1="50" y1="35" x2="56" y2="35" stroke="#FF1493" strokeWidth="1.5"/>
      <line x1="50" y1="40" x2="56" y2="40" stroke="#B8D8FF" strokeWidth="1.5"/>
      <line x1="50" y1="45" x2="56" y2="45" stroke="#00D9FF" strokeWidth="1.5"/>
      
      {/* Small chip 2 - top right */}
      <rect x="150" y="30" width="20" height="20" fill="#0B3D91" stroke="#FF6B35" strokeWidth="2" rx="2"/>
      <rect x="155" y="35" width="10" height="10" fill="#00FF88" rx="1"/>
      <circle cx="160" cy="40" r="2" fill="#00D9FF" filter="url(#glow)"/>
      <line x1="150" y1="35" x2="144" y2="35" stroke="#FFD54A" strokeWidth="1.5"/>
      <line x1="150" y1="40" x2="144" y2="40" stroke="#FF6B35" strokeWidth="1.5"/>
      <line x1="150" y1="45" x2="144" y2="45" stroke="#B8D8FF" strokeWidth="1.5"/>
      <line x1="170" y1="35" x2="176" y2="35" stroke="#00D9FF" strokeWidth="1.5"/>
      <line x1="170" y1="40" x2="176" y2="40" stroke="#00FF88" strokeWidth="1.5"/>
      <line x1="170" y1="45" x2="176" y2="45" stroke="#FF1493" strokeWidth="1.5"/>
      
      {/* Small chip 3 - left */}
      <rect x="15" y="90" width="18" height="18" fill="#0B3D91" stroke="#FFD54A" strokeWidth="2" rx="2"/>
      <rect x="19" y="94" width="10" height="10" fill="#B8D8FF" rx="1"/>
      <circle cx="24" cy="99" r="2" fill="#FF6B35" filter="url(#glow)"/>
      <line x1="15" y1="95" x2="9" y2="95" stroke="#00D9FF" strokeWidth="1.5"/>
      <line x1="15" y1="99" x2="9" y2="99" stroke="#FFD54A" strokeWidth="1.5"/>
      <line x1="15" y1="103" x2="9" y2="103" stroke="#FF1493" strokeWidth="1.5"/>
      
      {/* Small chip 4 - right */}
      <rect x="167" y="90" width="18" height="18" fill="#0B3D91" stroke="#00FF88" strokeWidth="2" rx="2"/>
      <rect x="171" y="94" width="10" height="10" fill="#FFD54A" rx="1"/>
      <circle cx="176" cy="99" r="2" fill="#00D9FF" filter="url(#glow)"/>
      <line x1="185" y1="95" x2="191" y2="95" stroke="#FF6B35" strokeWidth="1.5"/>
      <line x1="185" y1="99" x2="191" y2="99" stroke="#00FF88" strokeWidth="1.5"/>
      <line x1="185" y1="103" x2="191" y2="103" stroke="#B8D8FF" strokeWidth="1.5"/>
      
      {/* Small chip 5 - bottom left */}
      <rect x="30" y="150" width="20" height="20" fill="#0B3D91" stroke="#FF1493" strokeWidth="2" rx="2"/>
      <rect x="35" y="155" width="10" height="10" fill="#00D9FF" rx="1"/>
      <circle cx="40" cy="160" r="2" fill="#FFD54A" filter="url(#glow)"/>
      <line x1="30" y1="155" x2="24" y2="155" stroke="#FFD54A" strokeWidth="1.5"/>
      <line x1="30" y1="160" x2="24" y2="160" stroke="#00FF88" strokeWidth="1.5"/>
      <line x1="30" y1="165" x2="24" y2="165" stroke="#FF6B35" strokeWidth="1.5"/>
      <line x1="50" y1="155" x2="56" y2="155" stroke="#00D9FF" strokeWidth="1.5"/>
      <line x1="50" y1="160" x2="56" y2="160" stroke="#B8D8FF" strokeWidth="1.5"/>
      <line x1="50" y1="165" x2="56" y2="165" stroke="#FF1493" strokeWidth="1.5"/>
      
      {/* Small chip 6 - bottom right */}
      <rect x="150" y="150" width="20" height="20" fill="#0B3D91" stroke="#B8D8FF" strokeWidth="2" rx="2"/>
      <rect x="155" y="155" width="10" height="10" fill="#FF6B35" rx="1"/>
      <circle cx="160" cy="160" r="2" fill="#00FF88" filter="url(#glow)"/>
      <line x1="150" y1="155" x2="144" y2="155" stroke="#B8D8FF" strokeWidth="1.5"/>
      <line x1="150" y1="160" x2="144" y2="160" stroke="#FFD54A" strokeWidth="1.5"/>
      <line x1="150" y1="165" x2="144" y2="165" stroke="#00D9FF" strokeWidth="1.5"/>
      <line x1="170" y1="155" x2="176" y2="155" stroke="#FF1493" strokeWidth="1.5"/>
      <line x1="170" y1="160" x2="176" y2="160" stroke="#00FF88" strokeWidth="1.5"/>
      <line x1="170" y1="165" x2="176" y2="165" stroke="#FF6B35" strokeWidth="1.5"/>
    </svg>
  );
}
