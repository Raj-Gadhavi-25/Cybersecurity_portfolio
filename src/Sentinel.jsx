import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { FaTerminal, FaTimes, FaExpandAlt } from 'react-icons/fa';

const facts = [
  "SCANNING... SYSTEM_STATUS: SECURE.",
  "INTEL: RAJ HAS STRONG NETWORKING & CYBER THEORY KNOWLEDGE.",
  "VERIFIED: GOOGLE CYBERSECURITY CERT IS AUTHENTIC.",
  "DATA: TRAINING AT ECOSMOB TECHNOLOGIES (APRIL 2026).",
  "LOG: HANDS-ON SKILLS IN SPLUNK & WIRESHARK.",
  "NETWORK: FLUENT IN TCP/IP, DNS & FIREWALL CONFIGS.",
  "STATUS: ANALYZED IoCs IN MULTIPLE PHISHING SIMULATIONS.",
  "SYSTEM: CV DOSSIER READY FOR SECURE DOWNLOAD.",
  "AEGIS_CORE: PHYSICS_DRAG_MODE_ACTIVE."
];

const Sentinel = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const showRandomFact = () => {
      if (isMinimized) return;
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setMessage(randomFact);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 7000);
    };

    const interval = setInterval(showRandomFact, 20000);
    const initialTimeout = setTimeout(showRandomFact, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [isMinimized]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <Motion.div
        drag
        dragConstraints={{ left: 0, right: window.innerWidth - 100, top: 0, bottom: window.innerHeight - 100 }}
        dragElastic={0.1}
        dragMomentum={true}
        initial={{ x: 50, y: window.innerHeight - 180 }}
        className="absolute pointer-events-auto flex flex-col items-center"
        style={{ width: 'fit-content' }}
      >
        {/* Chat Bubble */}
        <AnimatePresence>
          {isVisible && !isMinimized && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mb-4 w-56 md:w-72 glass-card p-4 rounded-2xl border-[#2F81F7]/40 shadow-[0_0_30px_rgba(47,129,247,0.3)] relative"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-mono text-[#2F81F7] flex items-center gap-2 font-bold uppercase tracking-widest">
                  <FaTerminal className="animate-pulse" /> Aegis_Core // Data_Stream
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#E6EDF3] leading-relaxed font-medium font-mono">
                {message}
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 glass-card border-t-0 border-l-0 rotate-45 border-[#2F81F7]/30 border-r border-b"></div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* The Aegis Orb */}
        <div className="relative group">
          <Motion.div
            animate={{ 
              scale: isMinimized ? 0.7 : 1,
              opacity: isMinimized ? 0.6 : 1
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, cursor: 'grabbing' }}
            className="w-16 h-16 md:w-20 md:h-20 cursor-grab relative"
          >
            {/* Holographic Glow Layers */}
            <div className="absolute inset-0 bg-[#2F81F7]/10 blur-3xl rounded-full"></div>
            <div className="absolute inset-0 bg-[#2F81F7]/20 blur-xl rounded-full animate-pulse"></div>

            {/* Orbital Rings */}
            <div className="absolute inset-[-8px] border border-[#2F81F7]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-[-4px] border border-[#2F81F7]/40 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
            
            {/* Main Core */}
            <div className="w-full h-full rounded-full glass-card border-[#2F81F7]/60 flex items-center justify-center relative overflow-hidden soc-glow bg-[#121821]/80">
              {/* Inner Energy Core */}
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-[#2F81F7] to-cyan-400 rounded-full blur-sm opacity-50 animate-pulse"></div>
              
              {/* Hex Pattern Overlay (Simulated) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{backgroundImage: 'radial-gradient(#2F81F7 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
              
              {/* Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2F81F7]/40 to-transparent h-1/2 w-full -translate-y-full animate-[scan_3s_linear_infinite]"></div>
              
              {/* Status Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2F81F7] font-mono text-[8px] font-bold">
                {isMinimized ? 'OFF' : 'ON'}
              </div>
            </div>
          </Motion.div>

          {/* Action Buttons */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 glass-card rounded-full text-[#9BA7B4] hover:text-white hover:bg-[#2F81F7]/20"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <FaExpandAlt className="text-xs" /> : <FaTimes className="text-xs" />}
            </button>
          </div>
        </div>

        {/* Drag Hint */}
        {!isMinimized && (
          <p className="mt-3 text-[8px] font-mono text-[#2F81F7]/60 uppercase tracking-[0.2em] font-bold">
            System_Aegis // Locked_on_Target
          </p>
        )}
      </Motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </div>
  );
};

export default Sentinel;
