import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { FaTerminal, FaShieldAlt, FaBug, FaDatabase, FaPlay, FaRedo } from 'react-icons/fa';

const threatTypes = [
  { id: 1, label: 'MALWARE', icon: FaBug, color: '#ff3e3e' },
  { id: 2, label: 'BRUTE_FORCE', icon: FaTerminal, color: '#f7a02f' },
  { id: 3, label: 'SQL_INJECTION', icon: FaDatabase, color: '#2f81f7' },
];

const CommandCenter = () => {
  const [gameState, setGameState] = useState('idle'); // idle, active, ended
  const [score, setScore] = useState(0);
  const [threats, setThreats] = useState([]);
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5));
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'active') return;

    const spawnThreat = () => {
      const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const newThreat = {
        id: Date.now(),
        type,
        x: Math.random() * 80 + 10, // 10% to 90%
        y: -20,
      };
      setThreats((prev) => [...prev, newThreat]);
      addLog(`[ALERT] Incoming ${type.label} detected.`);
    };

    const spawnInterval = setInterval(spawnThreat, 2000);
    const moveInterval = setInterval(() => {
      setThreats((prev) => {
        const moved = prev.map((t) => ({ ...prev, ...t, y: t.y + 2 }));
        const passed = moved.filter((t) => t.y > 100);
        if (passed.length > 0) {
          setGameState('ended');
          addLog(`[CRITICAL] Perimeter breached by ${passed[0].type.label}.`);
        }
        return moved.filter((t) => t.y <= 100);
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [gameState, addLog]);

  const neutralizeThreat = (id, label) => {
    setThreats((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 100);
    addLog(`[SUCCESS] ${label} neutralized.`);
  };

  const startGame = () => {
    setGameState('active');
    setScore(0);
    setThreats([]);
    setLogs(['[SYSTEM] Initializing Aegis Defense protocols...']);
  };

  return (
    <section id="command-center" className="section-padding px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Aegis_Command_Center</h2>
          <p className="text-[#9BA7B4] font-mono text-sm">[TEST YOUR ANALYST REFLEXES]</p>
          <div className="w-20 h-1 bg-[#2F81F7] mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Dashboard Left */}
          <div className="lg:col-span-4 space-y-6" data-aos="fade-right">
            <div className="glass-card p-6 rounded-3xl border-[#2F81F7]/20">
              <h3 className="text-[#2F81F7] font-mono text-xs mb-4 uppercase tracking-widest font-bold">System_Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[#9BA7B4]">THREAT_LEVEL:</span>
                  <span className={`text-sm font-bold font-mono ${gameState === 'active' ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    {gameState === 'active' ? 'ELEVATED' : 'STABLE'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-mono text-[#9BA7B4]">SCORE:</span>
                  <span className="text-sm font-bold font-mono text-white">{score}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border-[#2F81F7]/20 h-48 overflow-hidden">
              <h3 className="text-[#2F81F7] font-mono text-xs mb-4 uppercase tracking-widest font-bold">Live_Logs</h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <Motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-mono text-[#9BA7B4] leading-tight"
                    >
                      {log}
                    </Motion.p>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Game Arena */}
          <div className="lg:col-span-8 relative h-[500px] glass-card rounded-[2.5rem] border-[#2F81F7]/30 overflow-hidden bg-[#0B0F14]/50" ref={containerRef}>
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{backgroundImage: 'linear-gradient(#2F81F7 1px, transparent 1px), linear-gradient(90deg, #2F81F7 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

            <AnimatePresence>
              {gameState === 'idle' && (
                <Motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0B0F14]/80 backdrop-blur-sm"
                >
                  <FaShieldAlt className="text-6xl text-[#2F81F7] mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-4">Initialize Defense?</h3>
                  <button 
                    onClick={startGame}
                    className="bg-[#2F81F7] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1f6feb] transition-all flex items-center gap-3"
                  >
                    <FaPlay className="text-xs" /> BOOT_SYSTEM
                  </button>
                </Motion.div>
              )}

              {gameState === 'ended' && (
                <Motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-red-900/20 backdrop-blur-md"
                >
                  <h3 className="text-4xl font-bold text-red-500 mb-2">BREACHED</h3>
                  <p className="text-xl font-mono mb-8">FINAL_SCORE: {score}</p>
                  <button 
                    onClick={startGame}
                    className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-3"
                  >
                    <FaRedo className="text-xs" /> REBOOT_AEGIS
                  </button>
                </Motion.div>
              )}
            </AnimatePresence>

            {/* Moving Threats */}
            <AnimatePresence>
              {threats.map((threat) => (
                <Motion.button
                  key={threat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, top: `${threat.y}%`, left: `${threat.x}%` }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  onClick={() => neutralizeThreat(threat.id, threat.type.label)}
                  className="absolute p-4 rounded-full glass-card border-none hover:scale-125 transition-transform"
                  style={{ boxShadow: `0 0 20px ${threat.type.color}44` }}
                >
                  <threat.type.icon className="text-2xl" style={{ color: threat.type.color }} />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono whitespace-nowrap opacity-60">
                    {threat.type.label}
                  </span>
                </Motion.button>
              ))}
            </AnimatePresence>

            {/* Instruction Overlay */}
            {gameState === 'active' && (
              <div className="absolute bottom-6 right-8 text-[10px] font-mono text-[#2F81F7] opacity-40 uppercase tracking-widest animate-pulse">
                Click threats to neutralize
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandCenter;
