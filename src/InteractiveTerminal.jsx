import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaCircle } from 'react-icons/fa';

const AUTHORIZED_COMMANDS = {
  help: 'Display available system protocols and commands.',
  whoami: 'Retrieve operational profile of Raj Gadhavi.',
  ls: 'List accessible directories (missions, intel, gear).',
  cat: 'Usage: cat [file] - Read specific data files.',
  scan: 'Execute a deep system vulnerability scan.',
  clear: 'Purge the terminal display history.',
  status: 'Check current system operational status.'
};

const FILES = {
  'missions/cyber_shield': 'Network threat detection system utilizing Wireshark and Splunk.',
  'missions/sentinel_drive': 'Encrypted storage solution with biometric simulation.',
  'intel/profile': 'Aspiring SOC Analyst focused on Threat Analysis and Incident Response.',
  'gear/stack': 'Splunk, Chronicle, Wireshark, Python, TCP/IP, Linux.',
};

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'SYSTEM_BOOT_SEQUENCE... [COMPLETE]' },
    { type: 'system', content: 'WELCOME TO AEGIS_OS v2.0.4. UNAUTHORIZED ACCESS PROHIBITED.' },
    { type: 'system', content: 'Type "help" to view authorized commands.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd) => {
    const args = cmd.toLowerCase().trim().split(' ');
    const baseCmd = args[0];
    const target = args[1];

    let response = [];
    
    switch (baseCmd) {
      case 'help':
        response.push({ type: 'output', content: '--- SYSTEM MANUAL: AUTHORIZED PROTOCOLS ---' });
        Object.entries(AUTHORIZED_COMMANDS).forEach(([key, val]) => {
          response.push({ type: 'output', content: `${key.padEnd(10)} - ${val}` });
        });
        break;
      
      case 'whoami':
        response.push({ type: 'output', content: 'USER: Raj Gadhavi' });
        response.push({ type: 'output', content: 'ROLE: Security Analyst / SOC Intern' });
        response.push({ type: 'output', content: 'STATUS: Operational' });
        break;

      case 'ls':
        response.push({ type: 'output', content: 'Directories:' });
        response.push({ type: 'output', content: 'missions/  intel/  gear/' });
        break;

      case 'cat':
        if (!target) {
          response.push({ type: 'error', content: 'ERROR: Specify a file target.' });
        } else if (FILES[target]) {
          response.push({ type: 'output', content: `Reading ${target}...` });
          response.push({ type: 'output', content: FILES[target] });
        } else {
          response.push({ type: 'error', content: `ERROR: File "${target}" not found or encrypted.` });
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'status':
        response.push({ type: 'output', content: '[OK] SIEM Engine active.' });
        response.push({ type: 'output', content: '[OK] Network packets being monitored.' });
        response.push({ type: 'output', content: '[OK] Firewall layers operational.' });
        break;

      case 'scan':
        response.push({ type: 'system', content: 'INITIATING SCAN...' });
        // Simulate a delay for a cooler effect
        setTimeout(() => {
          setHistory(prev => [...prev, 
            { type: 'output', content: 'SCAN COMPLETE: 0 Vulnerabilities Found. System Secure.' }
          ]);
        }, 1500);
        break;

      default:
        if (cmd.trim() === '') return;
        response.push({ type: 'error', content: `ERROR: Command "${baseCmd}" not recognized.` });
    }

    setHistory(prev => [...prev, { type: 'input', content: `> ${cmd}` }, ...response]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setCommandHistory(prev => [input, ...prev]);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="section-padding px-6">
      <div className="max-w-4xl mx-auto" data-aos="zoom-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Command_Interface</h2>
          <div className="w-20 h-1 bg-[#2F81F7] mx-auto"></div>
        </div>

        {/* Terminal Window */}
        <div 
          className="glass-card rounded-2xl border-[#2F81F7]/30 overflow-hidden shadow-[0_0_50px_rgba(47,129,247,0.15)]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="bg-[#121821]/80 px-6 py-4 border-b border-[#1F2933] flex justify-between items-center">
            <div className="flex gap-2">
              <FaCircle className="text-red-500/50 text-[10px]" />
              <FaCircle className="text-yellow-500/50 text-[10px]" />
              <FaCircle className="text-green-500/50 text-[10px]" />
            </div>
            <span className="text-xs font-mono text-[#9BA7B4] flex items-center gap-2">
              <FaTerminal className="text-[#2F81F7]" /> RAJ_AEGIS_TERMINAL (v2.0.4)
            </span>
            <div className="w-12"></div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalBodyRef}
            className="p-8 h-[450px] overflow-y-auto font-mono text-sm space-y-3 bg-[#0B0F14]/90 custom-scrollbar"
          >
            <AnimatePresence mode="popLayout">
              {history.map((line, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    ${line.type === 'input' ? 'text-white font-bold' : ''}
                    ${line.type === 'error' ? 'text-red-400' : ''}
                    ${line.type === 'system' ? 'text-[#2F81F7] opacity-80 italic' : ''}
                    ${line.type === 'output' ? 'text-[#9BA7B4]' : ''}
                  `}
                >
                  {line.content}
                </Motion.div>
              ))}
            </AnimatePresence>
            
            {/* Input Line */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[#2F81F7] font-bold">visitor@aegis:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="bg-transparent border-none outline-none text-[#E6EDF3] flex-1 caret-[#2F81F7]"
              />
            </div>
          </div>
        </div>
        
        <p className="text-center mt-6 text-xs font-mono text-[#9BA7B4] opacity-50 uppercase tracking-widest">
          Secure Session // TLS 1.3 // AES-256 Encrypted
        </p>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
