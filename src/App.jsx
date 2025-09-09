import { useEffect, useState } from 'react';
import { 
  FaLinkedin, FaGithub, FaArrowUp, FaGraduationCap, FaBriefcase, 
  FaCertificate, FaProjectDiagram, FaLaptopCode, FaAndroid, FaUniversity, 
  FaGoogle, FaUserShield, FaDatabase, FaNetworkWired, FaBug, FaUserSecret, 
  FaSchool, FaCode, FaShieldAlt, FaReact, FaWordpress, 
  FaInstagram
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll < lastScroll || currentScroll < 50);
      setLastScroll(currentScroll);
      setShowTopBtn(currentScroll > 300);
    };
    window.addEventListener('scroll', handleScroll);
    AOS.init({ duration: 800, once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  // ================= DATA ARRAYS =================
  const studies = [
    { title: 'B.Tech in IT', desc: ['Charusat University | 2022 – 2025 | CGPA: 8.18'], icon: FaGraduationCap },
    { title: 'Diploma in C.E.', desc: ['Marwadi University | 2019 – 2022 | CGPA: 8.68'], icon: FaUniversity },
    { title: 'SSC / 10th', desc: ['Modi School | 2018 – 2019 | Percentage: 73%'], icon: FaSchool },
  ];

  const internships = [
    { title: 'Web Designer Intern', company: 'Qrolic Technologies | Jan – May 2025', desc: ['Responsive web pages', 'Customized WordPress themes', 'Collaborated with senior developers', 'Learned web best practices'], icon: FaLaptopCode },
    { title: 'Android Development Intern', company: 'Prodigy Infotech | May – June 2024', desc: ['2-player Tic Tac Toe app', 'Implemented game logic & UI', 'Debugged & enhanced app', 'Learned Android best practices'], icon: FaAndroid },
    { title: 'FullStack Web Development Intern', company: 'Prolog Infotech | May – June 2023', desc: ['Front-end for Taxi Management System', 'Converted Figma/PSD to web pages', 'Improved UX/UI consistency', 'Optimized code for performance'], icon: FaLaptopCode },
  ];

  const certificates = [
    { title: 'Google Cybersecurity', date: '31 July 2025', desc: ['Network security', 'Threat detection', 'Risk management'], icon: FaGoogle },
    { title: 'Ethical Hacking Essentials', date: '8 Oct 2023', desc: ['Fundamentals of ethical hacking', 'Securing systems', 'Web & network exercises'], icon: FaUserShield },
    { title: 'NPTEL - OS Fundamentals', date: 'Jul – Oct 2023', desc: ['Processes & threads', 'Memory management', 'System calls'], icon: FaDatabase },
    { title: 'NPTEL - DBMS', date: 'Jan – Mar 2023', desc: ['ER modeling', 'SQL', 'Normalization & transactions'], icon: FaDatabase },
  ];

  const projects = [
    { title: 'Network Security Analysis', desc: ['Identified network vulnerabilities', 'Implemented firewall rules', 'Monitored traffic & logs'], icon: FaNetworkWired },
    { title: 'Cyber Threat Assessment', desc: ['Vulnerability scanning', 'Threat classification', 'Recommended mitigation steps'], icon: FaBug },
    { title: 'Incident Response Simulation', desc: ['Detected malicious activity', 'Isolated systems', 'Conducted forensic analysis'], icon: FaUserSecret },
  ];

  const skills = [
    { 
      title: 'Core Competencies', 
      desc: ['Threat Detection', 'Incident Response', 'Vulnerability Analysis', 'SOC Workflows'], 
      icon: FaShieldAlt 
    },
    { 
      title: 'Frameworks', 
      desc: ['NIST', 'ISO 27001'], 
      icon: FaReact 
    },
    { 
      title: 'Tools', 
      desc: ['Splunk', 'Google Chronicle', 'Security Onion', 'Wireshark'], 
      icon: FaDatabase 
    },
    { 
      title: 'Programming', 
      desc: ['Python', 'SQL', 'Linux CLI'], 
      icon: FaLaptopCode 
    },
  ];

  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans scroll-smooth overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-[#0a0a0a]/90 backdrop-blur-md ${showNav ? 'translate-y-0' : '-translate-y-24'}`} aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#ff6e6c] hover:text-[#ff8a7a] transition flex items-center gap-3">
            <img src="/images/favicon.png" alt="Raj Gadhavi logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-lg"  />
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 font-medium text-gray-200">
            {['Home','Studies','Internships','Certificates','Projects','Skills','Resume','Contact'].map(section => (
              <li key={section}>
                <a href={`#${section.toLowerCase()}`} className="hover:text-[#ff6e6c] transition">{section}</a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button aria-label="Toggle menu" className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white rounded-sm my-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col items-center bg-[#0a0a0a]/95 py-4 space-y-4 font-medium text-gray-200">
            {['Home','Studies','Internships','Certificates','Projects','Skills','Resume','Contact'].map(section => (
              <li key={section}>
                <a href={`#${section.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-[#ff6e6c] transition">{section}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center h-screen px-6 overflow-hidden bg-gradient-to-r from-[#ff6e6c] via-[#ff5fa1] to-[#ff4dbf]" aria-label="Hero section">
        <div className="flex flex-col items-center z-20">
          <img 
            src="/images/favicon.png" 
            alt="Raj Gadhavi logo in hero" 
            className="w-28 sm:w-36 md:w-44 lg:w-52 mb-6 drop-shadow-2xl" 
          />
        </div>

        <p className="relative text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-snug max-w-5xl mb-12 z-20 drop-shadow-lg">
          <Typewriter
            words={[
              'Cybersecurity & Web Designer.',
              'Building Secure Systems & Immersive Experiences.',
              'Passionate About Ethical Hacking & Innovation.',
              'Crafting Websites That Are Beautiful & Secure.',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={45}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </p>

        <a 
          href="https://www.linkedin.com/in/raj-gadhavi0125/" 
          target="_blank" 
          rel="noreferrer"
          aria-label="Connect with Raj on LinkedIn"
          className="z-20 inline-block bg-gradient-to-r from-[#7f00ff] via-[#e100ff] to-[#ff00c8] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:from-[#9c00ff] hover:to-[#ff33d1] transform hover:-translate-y-1 hover:scale-105 transition duration-300 text-sm sm:text-lg md:text-xl font-semibold"
        >
          Connect With Me
        </a>

        {/* Background blobs */}
        <div className="absolute top-10 left-1/4 w-40 h-40 sm:w-72 sm:h-72 bg-[#ff6e6c]/20 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute bottom-10 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-[#ff5fa1]/20 rounded-full blur-3xl animate-pulse z-0"></div>
      </section>

      {/* Sections */}
      <Section id="studies" title="Studies" icon={<FaGraduationCap />} items={studies} />
      <Section id="internships" title="Internships" icon={<FaBriefcase />} items={internships} showCompany />
      <Section id="certificates" title="Certificates" icon={<FaCertificate />} items={certificates} showDate />
      <Section id="projects" title="Cybersecurity Projects" icon={<FaProjectDiagram />} items={projects} />
      <Section id="skills" title="Skills" icon={<FaCode />} items={skills} />

      {/* Resume Section */}
<section id="resume" className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-3xl sm:text-4xl font-bold text-[#ff6e6c] mb-12 text-center flex justify-center items-center gap-3">
    📄 Resume
  </h2>

  <p className="text-gray-300 mb-12 text-center max-w-2xl mx-auto">
    Get a comprehensive look at my education, internships, certificates, and projects.  
    Download my resume to see how I can bring value to your team.
  </p>

  <div className="flex flex-col md:flex-row items-center justify-center gap-10">
    {/* Resume Card */}
    <div className="relative bg-gradient-to-br from-[#ff6e6c]/30 to-[#ff4dbf]/30 rounded-3xl shadow-2xl p-6 sm:p-10 max-w-sm hover:scale-105 hover:shadow-3xl transition transform duration-300 w-full">
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-[#ff6e6c] to-[#ff4dbf] text-white text-2xl rounded-full mb-6 shadow-lg">
        📄
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4 text-center">Download My Resume</h3>
      
      {/* Preview Snippet */}
      <ul className="space-y-2 text-gray-300 mb-6 text-sm sm:text-base">
        <li>🎓 B.Tech in IT - Charusat University</li>
        <li>💻 Web & Android Development Internships</li>
        <li>🛡 Cybersecurity Projects & Labs</li>
        <li>🏆 Certificates: Google, Ethical Hacking, NPTEL</li>
      </ul>

      {/* Download Button */}
      <a 
        href="/Raj_Gadhavi_Resume.pdf" 
        download 
        className="block bg-gradient-to-r from-[#7f00ff] via-[#e100ff] to-[#ff00c8] text-white text-center px-6 py-3 rounded-xl shadow-lg hover:from-[#9c00ff] hover:to-[#ff33d1] hover:-translate-y-1 hover:scale-105 transition transform duration-300 font-semibold"
        aria-label="Download Raj Gadhavi Resume"
      >
        Download Resume
      </a>

      {/* Decorative Gradient Circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff6e6c] to-[#ff4dbf] opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff5fa1] to-[#ff00c8] opacity-20 blur-3xl animate-pulse"></div>
    </div>

    {/* Optional Preview Image / Mockup */}
    <div className="hidden md:block max-w-sm w-full">
      <img 
        src="/images/resume-preview.png" 
        alt="Resume Preview" 
        className="rounded-3xl shadow-2xl hover:scale-105 transition transform duration-300"
      />
    </div>
  </div>

  {/* Footer Note */}
  <p className="text-gray-400 mt-8 text-center text-sm sm:text-base max-w-2xl mx-auto">
    📌 Always up-to-date with my latest skills and projects. Download to see my full professional journey.
  </p>
</section>


      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20" aria-label="Contact section">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#ff6e6c] mb-12 text-center">📬 Contact</h2>
        <div className="flex justify-center">
          <div className="w-full sm:w-3/4 md:w-1/2">
            <ContactCard />
          </div>
        </div>
      </section>

      {/* Back-to-Top Button */}
      {showTopBtn && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          aria-label="Scroll to top"
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:right-8 bg-gradient-to-r from-[#ff6e6c] via-[#ff5fa1] to-[#ff4dbf] text-white p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 z-50 border-2 border-white/20"
        >
          <FaArrowUp className="text-lg sm:text-xl" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/20 mt-20" aria-label="Footer">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#ff6e6c] flex items-center gap-3">
              <img src="/images/favicon.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
              Raj Gadhavi
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-xs">
              Building secure systems & beautiful websites. Always learning & sharing knowledge.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                {['Home','Studies','Internships','Certificates','Projects','Skills','Resume','Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-[#ff6e6c] transition">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>Email: <a href="mailto:rajgadhavi2501@gmail.com" className="hover:text-[#ff6e6c]">rajgadhavi2501@gmail.com</a></li>
                <li>Phone: <a href="tel:+918487065855" className="hover:text-[#ff6e6c]">+91 8487065855</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Follow Me</h3>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/raj-gadhavi0125/" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#ff6e6c] text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://github.com/Raj-Gadhavi-25" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#ff6e6c] text-xl" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.instagram.com/rajgadhavi._/?igsh=MXUxeGNvbnd4M2I1bw%3D%3D" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#ff6e6c] text-xl" aria-label="Instagram"><FaInstagram /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 py-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Raj Gadhavi. All Rights Reserved.
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark"
        role="status"
        aria-live="polite"
      />
    </div>
  );
}

// ================= Section Component =================
function Section({ id, title, icon, items, showCompany, showDate }) {
  const gradients = [
    'from-pink-500 to-purple-500',
    'from-red-500 to-pink-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500',
  ];

  return (
    <section id={id || title.toLowerCase()} className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#ff6e6c] mb-12 text-center flex justify-center items-center gap-3">
        {icon} {title}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item, i) => {
          const IconComponent = item.icon;
          const gradient = gradients[i % gradients.length];
          const isStudies = title === "Studies";

          return (
            <div key={i} data-aos={i % 2 === 0 ? 'fade-up' : 'fade-down'} className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:scale-105 hover:shadow-2xl transition transform duration-300">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mb-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl sm:text-2xl`}>
                <IconComponent />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#ff8a7a] mb-2">{item.title}</h3>
              {showCompany && <p className="text-gray-300 mb-2 text-sm sm:text-base">{item.company}</p>}
              {showDate && <p className="text-gray-300 mb-2 text-sm sm:text-base">{item.date}</p>}
              {item.desc && Array.isArray(item.desc) && (
                isStudies ? (
                  <div className="space-y-1 text-gray-300 text-sm sm:text-base">{item.desc.map((d, j) => <p key={j}>{d}</p>)}</div>
                ) : (
                  <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">{item.desc.map((d, j) => <li key={j}>{d}</li>)}</ul>
                )
              )}
              <div className={`absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl animate-pulse`}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ================= Contact Card =================
function ContactCard() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_thj8xpt',  // replace with your EmailJS service ID
      'template_0cneb65', // replace with your EmailJS template ID
      formData,
      '1C9AdMxkNWlNn9HT0'   // replace with your EmailJS public key
    ).then(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => toast.error('Failed to send message. Please try again.'));
  };

  return (
    <div 
      className="bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#ff6e6c]/30 
                 hover:scale-105 transform transition 
                 w-full max-w-md min-w-[300px] mx-auto"
      data-aos="fade-up"
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-[#ff8a7a] mb-4 text-center">
        Get in Touch
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="p-3 rounded-lg bg-[#222222] text-white border border-[#ff6e6c]/50 
                     focus:outline-none focus:border-[#ff6e6c]" 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="p-3 rounded-lg bg-[#222222] text-white border border-[#ff6e6c]/50 
                     focus:outline-none focus:border-[#ff6e6c]" 
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
          className="p-3 rounded-lg bg-[#222222] text-white border border-[#ff6e6c]/50 
                     focus:outline-none focus:border-[#ff6e6c] 
                     resize-none min-h-[120px]"
        />

        <button 
          type="submit" 
          className="bg-[#ff6e6c] hover:bg-[#ff8a7a] text-white px-5 py-3 rounded-xl 
                     transition transform hover:-translate-y-1 hover:scale-105 font-semibold"
          aria-label="Send message"
        >
          Send Message
        </button>
      </form>

      {/* Social Links */}
      <div className="mt-6 text-center">
        <p className="text-gray-300 mb-3 font-medium">Or connect with me:</p>
        <div className="flex justify-center gap-6 text-2xl text-gray-300">
          <a href="https://www.linkedin.com/in/raj-gadhavi0125/" target="_blank" rel="noreferrer" className="hover:text-[#ff6e6c]" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com/Raj-Gadhavi-25" target="_blank" rel="noreferrer" className="hover:text-[#ff6e6c]" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.instagram.com/rajgadhavi._/?igsh=MXUxeGNvbnd4M2I1bw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-[#ff6e6c]" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
}
