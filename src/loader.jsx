// src/components/Loader.jsx
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0B0F14] z-50">
      
      {/* Spinning layered circles */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-t-[#2F81F7] border-gray-700 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-3 border-4 border-t-[#1ED760] border-gray-700 rounded-full animate-spin"></div>
        <div className="absolute inset-6 border-4 border-t-[#FF6B6B] border-gray-700 rounded-full animate-spin-reverse"></div>
      </div>

      {/* Cybersecurity-themed text */}
      <div className="text-center">
        <h2 className="text-[#2F81F7] text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <FaShieldAlt className="animate-pulse text-2xl" /> Initializing SOC Dashboard...
        </h2>
        <p className="text-[#9BA7B4] text-sm">
          Scanning for threats and loading portfolio data...
        </p>
      </div>

      {/* Optional: small animated dots for a typing effect */}
      <div className="mt-4 flex space-x-1">
        <span className="w-2 h-2 bg-[#2F81F7] rounded-full animate-bounce delay-0"></span>
        <span className="w-2 h-2 bg-[#2F81F7] rounded-full animate-bounce delay-200"></span>
        <span className="w-2 h-2 bg-[#2F81F7] rounded-full animate-bounce delay-400"></span>
      </div>

      {/* Tailwind custom animations */}
      <style>
        {`
          .animate-spin-slow { 
            animation: spin 2s linear infinite; 
          }
          .animate-spin-reverse { 
            animation: spin-reverse 1s linear infinite; 
          }
          .animate-bounce { 
            animation: bounce 0.6s infinite alternate; 
          }
          .delay-0 { animation-delay: 0s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          @keyframes spin-reverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
}