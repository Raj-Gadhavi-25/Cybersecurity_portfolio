import { useEffect, useState, useRef } from "react";
import Loader from "./loader";
import NetworkBackground from "./NetworkBackground";
import Sentinel from "./Sentinel";
import InteractiveTerminal from "./InteractiveTerminal";
import {
  FaLinkedin,
  FaGithub,
  FaArrowUp,
  FaDatabase,
  FaUserShield,
  FaBug,
  FaNetworkWired,
  FaUserSecret,
  FaCode,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ===== CONSTANTS =====
const RESUME_URL = "./Resume.pdf?v=2";

export default function App() {
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const heroTitleRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll < lastScroll || currentScroll < 50);
      setLastScroll(currentScroll);
      setShowTopBtn(currentScroll > 300);
    };
    window.addEventListener("scroll", handleScroll);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-quart' });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // GSAP Scramble Effect
  useEffect(() => {
    if (!loading && heroTitleRef.current) {
      const text = "Raj Gadhavi";
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
      let iteration = 0;
      
      const interval = setInterval(() => {
        heroTitleRef.current.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [loading]);

  // GSAP Triage Scroll Effect
  useEffect(() => {
    if (!loading && experienceRef.current) {
      const cards = experienceRef.current.querySelectorAll(".experience-card");
      
      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -50 : 50,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [loading]);

  const projects = [
    { title: "Log Analysis & Monitoring", desc: ["Analyzed system logs using Splunk & Chronicle", "Detected failed login attempts and patterns", "Correlated logs to identify activities", "Created alerts for real-time detection"], icon: FaDatabase },
    { title: "Phishing Analysis", desc: ["Analyzed phishing emails and extracted IoCs", "Detected malicious links & headers", "Performed phishing simulations", "Improved social engineering awareness"], icon: FaUserShield },
    { title: "Threat Hunting Automation", desc: ["Developed Python scripts for detection", "Automated log monitoring & alerts", "Reduced manual analysis effort", "Enhanced detection of activities"], icon: FaBug },
  ];

  const skills = [
    { title: "SIEM & Security Tools", desc: ["Splunk – Analysis & Alerts", "Google Chronicle – Detection", "Wireshark – Traffic analysis"], icon: FaShieldAlt },
    { title: "Networking", desc: ["TCP/IP, DNS, Ports, Firewalls", "Packet analysis & troubleshooting"], icon: FaNetworkWired },
    { title: "Technical", desc: ["Python – Automation scripts", "SQL – Querying & analysis", "Linux – System operations"], icon: FaCode },
    { title: "Security Concepts", desc: ["Threat Detection & Analysis", "SOC Operations", "Incident Response"], icon: FaUserSecret },
  ];

  const Experience = [
    { title: "Trainee Engineer", company: "Ecosmob Technologies", duration: "April 2026 – Present", desc: ["Advanced Linux commands & operations", "VoIP workflow & analysis", "Wireshark & VoIP Monitor logs", "SSL certificate management", "NetSapiens & HoduPBX switches"] },
    { title: "Mastercard Virtual Exp", company: "Mastercard (Forage)", duration: "April 2026 | ~2-3 hours", desc: ["Fraud detection & cybersecurity", "Risk scenarios & security incidents", "Enterprise security systems"] },
    { title: "CommBank Virtual Exp", company: "Commonwealth Bank (Forage)", duration: "April 2026 | ~2-3 hours", desc: ["Security analysis & detection", "SOC workflows & monitoring", "Real-world case simulations"] },
    { title: "Deloitte Virtual Exp", company: "Deloitte (Forage)", duration: "April 2026 | ~2-3 hours", desc: ["Cybersecurity simulation tasks", "Threats & vulnerabilities analysis", "Incident response scenarios"] },
    { title: "Web Designer Intern", company: "Qrolic Technologies", duration: "Jan 2025 – May 2025", desc: ["Developed responsive websites (HTML/CSS/JS)", "Worked on real client projects & UI/UX", "Customized WordPress websites using Elementor"] },
  ];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_thj8xpt", "template_0cneb65", formData, "1C9AdMxkNWlNn9HT0")
      .then(() => { toast.success("Transmission Received."); setFormData({ name: "", email: "", message: "" }); })
      .catch(() => toast.error("Transmission Failed."));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] relative overflow-x-hidden selection:bg-[#2F81F7]/30">
      <NetworkBackground />
      <Sentinel />
      <div className="scan-line"></div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 bg-[#0B0F14]/90 backdrop-blur-md border-b border-[#1F2933] transition-transform duration-500 ${showNav ? "translate-y-0" : "-translate-y-20"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#2F81F7] flex items-center gap-2">
            <FaUserShield className="animate-pulse" />
            <span className="hidden sm:inline">Raj Gadhavi</span>
          </h1>

          <div className="hidden lg:flex gap-8 items-center">
            {["About", "Experience", "Operations", "Tech_Stack", "Certifications"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-sm font-mono text-[#9BA7B4] hover:text-[#2F81F7] transition-colors">{s}</a>
            ))}
            <a href={RESUME_URL} download className="text-sm font-mono text-[#9BA7B4] hover:text-[#2F81F7] transition-colors">Resume</a>
            <a href="#contact" className="bg-[#2F81F7] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#1f6feb] transition-all transform hover:scale-105 soc-glow">CONNECT</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-8 h-8 flex flex-col justify-around">
            <span className={`h-1 w-full bg-white rounded transition-all ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`h-1 w-full bg-white rounded transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`h-1 w-full bg-white rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-screen py-8 border-b border-[#1F2933]" : "max-h-0"} bg-[#121821] px-6`}>
          {["About", "Experience", "Operations", "Tech_Stack", "Certifications", "Resume", "Contact"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-4 text-xl font-mono text-[#9BA7B4] border-b border-[#1F2933]/30 last:border-0">{s}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" className="min-h-screen flex items-center px-6 section-padding relative">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7" data-aos="fade-right">
            <p className="text-sm font-mono text-[#2F81F7] mb-4 tracking-widest">[STATUS: OPERATIONAL]</p>
            <h1 ref={heroTitleRef} className="hero-title font-bold mb-6">Raj Gadhavi</h1>
            <h2 className="hero-subtitle text-[#2F81F7] font-medium mb-8">Aspiring SOC Analyst & Security Enthusiast</h2>
            <p className="text-lg text-[#9BA7B4] leading-relaxed max-w-2xl mb-10">
              Deeply grounded in <span className="text-white font-medium">Networking & Cybersecurity fundamentals</span>. Experienced in analyzing threats and logs using tools like <span className="text-white font-medium">Splunk</span> and <span className="text-white font-medium">Wireshark</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#operations" className="bg-[#2F81F7] px-8 py-4 rounded-xl font-bold hover:bg-[#1f6feb] transition-all hover:scale-105 soc-glow">View Missions</a>
              <a href={RESUME_URL} download className="border border-[#2F81F7] text-[#2F81F7] px-8 py-4 rounded-xl font-bold hover:bg-[#2F81F7]/10 transition-all hover:scale-105">Personnel Dossier</a>
            </div>
          </div>

          <div className="lg:col-span-5" data-aos="zoom-in">
            <div className="glass-card rounded-3xl p-8 relative soc-glow border-[#2F81F7]/20">
              <div className="flex justify-between items-center mb-8 border-b border-[#1F2933] pb-4">
                <span className="font-mono text-xs text-[#2F81F7]">SEC_INTEL_V2</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { label: "SIEM_ENGINE", val: "Splunk, Chronicle" },
                  { label: "NET_ANALYSIS", val: "Wireshark, TCP/IP" },
                  { label: "DEFENSE", val: "Incident Response" }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-mono text-[#2F81F7] mb-1 opacity-60 tracking-tighter">{item.label}</p>
                    <p className="text-base font-medium">{item.val}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-[#1F2933] flex justify-between items-center font-mono text-[9px] text-[#9BA7B4]">
                <span>MOD: ENCRYPTED</span>
                <span className="text-green-500 animate-pulse">LIVE_FEED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" ref={experienceRef} className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Tactical Experience</h2>
            <div className="w-20 h-1 bg-[#2F81F7] mx-auto"></div>
          </div>
          <div className="space-y-8">
            {Experience.map((exp, i) => (
              <div key={i} className="experience-card glass-card p-8 rounded-3xl hover-lift flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="md:w-1/4">
                  <p className="text-xs font-mono text-[#2F81F7] mb-2">{exp.duration}</p>
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                </div>
                <div className="md:w-3/4 border-l border-[#1F2933] md:pl-12">
                  <h4 className="text-lg font-bold text-[#2F81F7] mb-4">{exp.title}</h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {exp.desc.map((d, j) => (
                      <li key={j} className="text-sm text-[#9BA7B4] flex gap-2">
                        <span className="text-[#2F81F7]">▹</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Operations" items={projects} />
      <Section title="Tech_Stack" items={skills} />

      <InteractiveTerminal />

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">Verified Certs</h2>
            <div className="w-20 h-1 bg-[#2F81F7] mx-auto"></div>
          </div>
          <div className="responsive-grid">
            {[
              { title: "Google Cybersecurity", org: "Coursera", img: "google-logo.jpeg" },
              { title: "Operating Systems", org: "NPTEL", img: "NPTEL-logo.jpeg" },
              { title: "Database Systems", org: "NPTEL", img: "NPTEL-logo.jpeg" }
            ].map((c, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover-lift flex items-center gap-6" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="w-16 h-16 bg-white/5 p-3 rounded-xl flex-shrink-0">
                  <img src={`./images/${c.img}`} alt={c.title} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-[#2F81F7] font-mono">{c.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F81F7]/5 blur-[120px]"></div>
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div data-aos="fade-right">
                <h2 className="text-5xl font-bold mb-8">Initiate Connection</h2>
                <p className="text-[#9BA7B4] text-lg mb-12">Opening secure channels for internships and SOC career opportunities.</p>
                <div className="space-y-6">
                  {[
                    { label: "Email", val: "rajgadhavi2501@gmail.com", link: "mailto:rajgadhavi2501@gmail.com" },
                    { label: "LinkedIn", val: "raj-gadhavi0125", link: "https://www.linkedin.com/in/raj-gadhavi0125/" },
                    { label: "GitHub", val: "Raj-Gadhavi-25", link: "https://github.com/Raj-Gadhavi-25" }
                  ].map(item => (
                    <div key={item.label} className="flex flex-col gap-1 border-l-2 border-[#1F2933] pl-6 hover:border-[#2F81F7] transition-all group">
                      <span className="text-xs font-mono text-[#2F81F7] uppercase tracking-widest">{item.label}</span>
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-xl font-medium text-[#E6EDF3] hover:text-[#2F81F7] transition-colors break-all">
                        {item.val}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-left">
                <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="IDENTIFIER" required className="w-full bg-[#0B0F14] border border-[#1F2933] p-5 rounded-2xl outline-none focus:border-[#2F81F7]" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="SOURCE_ADDR" required className="w-full bg-[#0B0F14] border border-[#1F2933] p-5 rounded-2xl outline-none focus:border-[#2F81F7]" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="TRANSMISSION_DATA" required rows="5" className="w-full bg-[#0B0F14] border border-[#1F2933] p-5 rounded-2xl outline-none focus:border-[#2F81F7] resize-none" />
                <button type="submit" className="w-full bg-[#2F81F7] py-5 rounded-2xl font-bold text-xl hover:bg-[#1f6feb] transition-all soc-glow uppercase tracking-widest">Transmit</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-[#1F2933] mx-6">
        <p className="text-[#9BA7B4] font-mono text-sm uppercase tracking-tighter">© {new Date().getFullYear()} RAJ_GADHAVI // SECURED_BY_REACT</p>
      </footer>

      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-10 right-10 bg-[#2F81F7] p-5 rounded-2xl soc-glow z-50 transition-all hover:scale-110 active:scale-95">
          <FaArrowUp />
        </button>
      )}

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}

function Section({ title, items }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".section-card");
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section id={title.toLowerCase()} ref={sectionRef} className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <div className="w-20 h-1 bg-[#2F81F7] mx-auto"></div>
        </div>
        <div className="responsive-grid">
          {items.map((item, i) => (
            <div key={i} className="section-card glass-card p-10 rounded-3xl hover-lift group">
              <item.icon className="text-3xl text-[#2F81F7] mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
              <ul className="space-y-4">
                {item.desc.map((d, j) => (
                  <li key={j} className="text-[#9BA7B4] text-sm flex gap-3 leading-relaxed">
                    <span className="text-[#2F81F7]">▹</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
