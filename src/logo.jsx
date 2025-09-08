export default function Logo({ size = 40 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full"
    >
      {/* Shield background */}
      <path 
        d="M32 2L58 16V32C58 48 32 62 32 62C32 62 6 48 6 32V16L32 2Z" 
        fill="url(#grad)" 
      />
      {/* Initials RG */}
      <text 
        x="32" 
        y="38" 
        textAnchor="middle" 
        fontSize="20" 
        fontWeight="bold" 
        fill="white" 
        fontFamily="Poppins, sans-serif"
      >
        RG
      </text>
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6e6c"/>
          <stop offset="1" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
