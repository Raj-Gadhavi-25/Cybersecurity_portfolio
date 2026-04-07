import { useEffect, useState } from 'react';
import {
  FaLinkedin, FaGithub, FaArrowUp,
  FaDatabase, FaUserShield, FaBug,
  FaNetworkWired, FaUserSecret, FaCode, FaShieldAlt
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

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

  // ===== DATA =====

  const projects = [
  {
    title: 'Log Analysis & Monitoring',
    desc: [
      'Analyzed system logs using Splunk & Chronicle SIEM tools',
      'Detected failed login attempts and brute-force attack patterns',
      'Correlated logs to identify suspicious activities',
      'Created alerts for real-time threat detection'
    ],
    icon: FaDatabase
  },
  {
    title: 'Phishing Analysis',
    desc: [
      'Analyzed phishing emails and extracted Indicators of Compromise (IoCs)',
      'Detected malicious links, spoofed domains, and email headers',
      'Performed phishing simulations to understand attack patterns',
      'Improved awareness of social engineering techniques'
    ],
    icon: FaUserShield
  },
  {
    title: 'Threat Hunting Automation',
    desc: [
      'Developed Python scripts for automated threat detection',
      'Automated log monitoring and alert generation',
      'Reduced manual analysis effort and improved efficiency',
      'Enhanced detection of suspicious activities'
    ],
    icon: FaBug
  }
];

  const skills = [
  {
    title: 'SIEM & Security Tools',
    desc: [
      'Splunk – Log analysis & alert creation',
      'Google Chronicle – Threat detection',
      'Wireshark – Network traffic analysis'
    ],
    icon: FaShieldAlt
  },
  {
    title: 'Networking',
    desc: [
      'TCP/IP, DNS, Ports, Firewalls',
      'Packet analysis & troubleshooting'
    ],
    icon: FaNetworkWired
  },
  {
    title: 'Technical',
    desc: [
      'Python – Automation scripts',
      'SQL – Querying & analysis',
      'Linux – System operations'
    ],
    icon: FaCode
  },
  {
    title: 'Security Concepts',
    desc: [
      'Threat Detection & Analysis',
      'SOC Operations',
      'Incident Response'
    ],
    icon: FaUserSecret
  }
];
  

  // ===== CONTACT =====
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    "service_thj8xpt",
    "template_0cneb65",
    {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    },
    "1C9AdMxkNWlNn9HT0"
  )
  .then(() => {
    toast.success("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  })
  .catch((error) => {
    console.error(error);
    toast.error("Failed to send message.");
  });
};

  const Experience = [
  {
    title: 'Web Designer Intern',
    company: 'Qrolic Technologies',
    duration: 'Jan 2025 – May 2025',
    desc: [
      'Developed responsive websites using HTML, CSS, JavaScript',
      'Worked on real client projects and improved UI/UX',
      'Customized WordPress websites using Elementor'
    ]
  },
  {
    title: 'Cybersecurity Virtual Experience',
    company: 'Deloitte (Forage)',
    duration: '2025 | ~2-3 hours',
    desc: [
      'Completed real-world cybersecurity simulation tasks',
      'Analyzed security threats and vulnerabilities',
      'Worked on incident response scenarios'
    ]
  },
  {
    title: 'Cybersecurity Virtual Experience',
    company: 'Commonwealth Bank (Forage)',
    duration: '2025 | ~2-3 hours',
    desc: [
      'Performed security analysis and threat detection tasks',
      'Understood SOC workflows and monitoring techniques',
      'Worked on real-world case-based simulations'
    ]
  },
  {
    title: 'Cybersecurity Virtual Experience',
    company: 'Mastercard (Forage)',
    duration: '2025 | ~2-3 hours',
    desc: [
      'Learned fraud detection and cybersecurity practices',
      'Analyzed risk scenarios and security incidents',
      'Improved understanding of enterprise security systems'
    ]
  }
];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3]">

      {/* NAVBAR */}
<nav className={`fixed top-0 w-full z-50 bg-[#0B0F14]/90 backdrop-blur border-b border-[#1F2933] transition ${showNav ? 'translate-y-0' : '-translate-y-20'}`}>
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

    {/* LOGO */}
    <h1 className="text-xl font-bold text-[#2F81F7]">Raj Gadhavi</h1>

    {/* DESKTOP MENU (≥1024px) */}
    <div className="hidden lg:flex flex-wrap gap-6">
      {[
        'About',
        'Experience',
        'Projects',
        'Skills',
        'Why Hire Me',
        'Certifications',
        'Resume',
        'Contact'
      ].map((s) => (
        <a
          key={s}
          href={`#${s.toLowerCase().replace(/\s+/g, '-')}`}
          className="relative group transition duration-300"
        >
          <span className="group-hover:text-[#2F81F7] transition duration-300">{s}</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#2F81F7] transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
    </div>

    {/* HAMBURGER BUTTON (visible <1024px) */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="lg:hidden relative w-8 h-8 flex flex-col justify-between items-center"
>
  {/* Hamburger lines */}
  <span
    className={`block h-1 w-full bg-white rounded transition-all duration-300
      ${menuOpen ? 'rotate-45 translate-y-3.5 bg-[#2F81F7]' : ''}`}
  ></span>
  <span
    className={`block h-1 w-full bg-white rounded transition-all duration-300
      ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
  ></span>
  <span
    className={`block h-1 w-full bg-white rounded transition-all duration-300
      ${menuOpen ? '-rotate-45 -translate-y-3.5 bg-[#2F81F7]' : ''}`}
  ></span>
</button>
  </div>

  {/* MOBILE/TABLET MENU (<1024px) with slide-down animation */}
  <div
    className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out
      ${menuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0' } bg-[#121821] px-6`}
  >
    {[
      'About',
      'Experience',
      'Projects',
      'Skills',
      'Why Hire Me',
      'Certifications',
      'Resume',
      'Contact'
    ].map((s) => (
      <a
        key={s}
        href={`#${s.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => setMenuOpen(false)}
        className="block text-[#9BA7B4] hover:text-[#2F81F7] transition duration-300 hover:translate-x-1 py-2"
      >
        {s}
      </a>
    ))}
  </div>
</nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 pt-24 md:pt-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <p className="text-sm text-[#9BA7B4] mb-2">👋 Hello, I'm</p>

            <h1 className="text-5xl font-bold mb-4">Raj Gadhavi</h1>

            <h2 className="text-xl text-[#2F81F7] mb-4">
  Detecting cyber threats using SIEM tools like Splunk & Chronicle
</h2>

<p className="text-[#9BA7B4] mb-6">
  Aspiring SOC Analyst with hands-on experience in log analysis, threat detection,
  and incident response. Skilled in identifying brute-force attacks, phishing attempts,
  and suspicious behavior using real-world security tools.
</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#projects" className="bg-[#2F81F7] px-6 py-3 rounded-lg hover:bg-[#1f6feb] hover:scale-105 hover:shadow-lg transition duration-300">
                Projects
              </a>

              <a href="/Resume.pdf" download className="border border-[#2F81F7] px-6 py-3 rounded-lg hover:bg-[#2F81F7]/10 hover:scale-105 transition duration-300">
                Resume
              </a>

              <a href="#contact" className="border border-[#30363D] px-6 py-3 rounded-lg hover:bg-[#121821] hover:scale-105 transition duration-300">
                Contact
              </a>
            </div>

            <div className="flex gap-4 text-xl text-[#9BA7B4]">
  <a
    href="https://www.linkedin.com/in/raj-gadhavi0125/"
    target="_blank"
    rel="noreferrer"
    className="hover:text-[#2F81F7] hover:-translate-y-1 hover:scale-110 transition duration-300"
  >
    <FaLinkedin />
  </a>
  <a
    href="https://github.com/Raj-Gadhavi-25"
    target="_blank"
    rel="noreferrer"
    className="hover:text-[#2F81F7] hover:-translate-y-1 hover:scale-110 transition duration-300"
  >
    <FaGithub />
  </a>
</div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#121821] border border-[#1F2933] rounded-xl p-6">
            <h3 className="text-[#2F81F7] mb-4 font-semibold">Highlights</h3>
            <ul className="space-y-3 text-sm text-[#9BA7B4]">
              <li>✔ SIEM Tools (Splunk, Chronicle)</li>
              <li>✔ Log Analysis & Monitoring</li>
              <li>✔ Phishing & Threat Detection</li>
              <li>✔ Networking & Linux</li>
              <li>✔ Real-world Lab Projects</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto py-24 px-6">

  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
    👨‍💻 About Me
  </h2>

  <p className="text-center text-[#9BA7B4] mb-12 max-w-2xl mx-auto">
    A passionate cybersecurity enthusiast focused on defending systems,
    analyzing threats, and building secure digital environments.
  </p>

  <div className="grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT - DESCRIPTION */}
    <div className="text-[#9BA7B4] leading-relaxed space-y-6">

      <p>
        I am an <span className="text-white font-medium">aspiring Cybersecurity Analyst</span> 
        with hands-on experience in log analysis, threat detection, and 
        security monitoring using SIEM tools like 
        <span className="text-[#2F81F7]"> Splunk</span> and 
        <span className="text-[#2F81F7]"> Google Chronicle</span>.
      </p>

      <p>
        I have worked on identifying suspicious activities such as 
        brute-force attacks, phishing attempts, and unauthorized access 
        by analyzing logs and correlating events across systems.
      </p>

      <p>
        My technical foundation includes strong knowledge of 
        <span className="text-white"> networking (TCP/IP, DNS, ports, firewalls)</span> 
        and <span className="text-white">Linux systems</span>, along with tools like 
        Wireshark and Nmap for network analysis.
      </p>

      <p>
        I am highly interested in working in 
        <span className="text-[#2F81F7] font-medium"> Security Operations Center (SOC)</span> 
        environments where I can contribute to real-time threat detection 
        and continuously enhance my cybersecurity skills.
      </p>

    </div>

    {/* RIGHT - HIGHLIGHT CARDS */}
    <div className="grid gap-6">

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">🛡️ Security Focus</h3>
        <p className="text-sm text-[#9BA7B4]">
          Threat Detection, Log Analysis, Incident Response, SOC Operations
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">⚙️ Tools & Technologies</h3>
        <p className="text-sm text-[#9BA7B4]">
          Splunk, Chronicle, Wireshark, Nmap, Linux, Python, SQL
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">🚀 Career Goal</h3>
        <p className="text-sm text-[#9BA7B4]">
          To become a skilled SOC Analyst and help organizations detect 
          and prevent cyber threats effectively.
        </p>
      </div>

    </div>

  </div>
</section>

{/* EXPERIENCE */}
<section id="experience" className="max-w-6xl mx-auto py-24 px-6">

  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
    💼 Experience
  </h2>

  <p className="text-center text-[#9BA7B4] mb-16 max-w-2xl mx-auto">
    My journey from web development to cybersecurity through hands-on experience,
    internships, and real-world simulations.
  </p>

  {/* TIMELINE CONTAINER */}
  <div className="relative max-w-3xl mx-auto border-l border-[#1F2933]">

    {/* INTERNSHIP */}
    <div className="mb-12 pl-10 relative hover:translate-x-2 transition duration-300">

      {/* DOT */}
      <span className="absolute -left-2 top-3 w-4 h-4 bg-[#2F81F7] rounded-full border-4 border-[#0B0F14]"></span>

      {/* TIMESTAMP */}
      <p className="inline-block text-sm font-semibold text-[#2F81F7] bg-[#2F81F7]/10 px-3 py-1 rounded-full mb-3 tracking-wide">
        Jan 2025 – May 2025
      </p>

      <h3 className="text-lg font-semibold text-white">
        Web Designer Intern
      </h3>

      <p className="text-sm text-[#2F81F7] mb-3">
        Qrolic Technologies
      </p>

      <ul className="text-sm text-[#9BA7B4] space-y-1 list-disc ml-4">
        <li>Developed responsive websites using HTML, CSS, JavaScript</li>
        <li>Worked on real client projects and improved UI/UX</li>
        <li>Customized WordPress websites using Elementor</li>
      </ul>
    </div>

    {/* FORAGE EXPERIENCES */}
    <div className="mb-12 pl-10 relative hover:translate-x-2 transition duration-300">

      {/* DOT */}
      <span className="absolute -left-2 top-3 w-4 h-4 bg-[#2F81F7] rounded-full border-4 border-[#0B0F14]"></span>

      {/* TIMESTAMP */}
      <p className="inline-block text-sm font-semibold text-[#2F81F7] bg-[#2F81F7]/10 px-3 py-1 rounded-full mb-3 tracking-wide">
        4 April 2026
      </p>

      <h3 className="text-lg font-semibold text-white">
        Cybersecurity Virtual Experience (Forage)
      </h3>

      <p className="text-sm text-[#2F81F7] mb-3">
        Deloitte → Mastercard → Commonwealth Bank
      </p>

      <ul className="text-sm text-[#9BA7B4] space-y-2 list-disc ml-4">
        <li><span className="text-white">Deloitte:</span> Incident response & threat analysis</li>
        <li><span className="text-white">Mastercard:</span> Fraud detection & risk analysis</li>
        <li><span className="text-white">Commonwealth Bank:</span> SOC monitoring & detection</li>
        <li>Completed 3 simulations (~2–3 hours each)</li>
      </ul>
    </div>

  </div>
</section>

      {/* PROJECTS */}
      <Section title="Projects" items={projects} />

      {/* SKILLS */}
      <Section title="Skills" items={skills} />

      {/* WHY HIRE ME */}
<section id="why-hire-me" className="max-w-6xl mx-auto py-24 px-6">
  <h2 className="text-3xl font-bold text-center mb-10 text-white">
    💡 Why Hire Me?
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {[
      "Hands-on experience with SIEM tools (Splunk, Chronicle)",
      "Strong understanding of SOC workflows & incident response",
      "Built real-world threat detection projects",
      "Quick learner with strong cybersecurity fundamentals"
    ].map((item, i) => (
      <div key={i} className="p-5 bg-[#121821] border border-[#1F2933] rounded-xl">
        ✔ {item}
      </div>
    ))}
  </div>
</section>

{/* CERTIFICATIONS */}
<section id="certifications" className="max-w-6xl mx-auto py-24 px-6">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
    📜 Certifications
  </h2>

  <p className="text-center text-[#9BA7B4] mb-12 max-w-2xl mx-auto">
    Certifications that showcase my knowledge in cybersecurity, systems, and core computer science fundamentals.
  </p>

  <div className="space-y-10">

    {/* ===== 2026 ===== */}
    <div>
      <h3 className="text-xl font-semibold text-[#2F81F7] mb-4">2026</h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Forage (Updated) */}
        <div className="p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition md:col-span-2">
          <h3 className="font-semibold text-white">
            Cybersecurity Virtual Experience
          </h3>
          <p className="text-sm text-[#9BA7B4]">
            Deloitte, Mastercard, Commonwealth Bank (Forage) • 4 April 2026
          </p>
          <p className="text-sm text-[#9BA7B4] mt-2">
            Hands-on simulations in SOC workflows, threat detection, incident response, and security analysis.
          </p>
        </div>

      </div>
    </div>

    {/* ===== 2025 ===== */}
    <div>
      <h3 className="text-xl font-semibold text-[#2F81F7] mb-4">2025</h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Google Cybersecurity */}
        <div className="p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition md:col-span-2">
          <h3 className="font-semibold text-white">
            Google Cybersecurity Certificate
          </h3>
          <p className="text-sm text-[#9BA7B4]">Coursera</p>
          <p className="text-sm text-[#9BA7B4] mt-2">
            Covered SIEM tools, threat detection, incident response, and security fundamentals.
          </p>
        </div>

      </div>
    </div>

    {/* ===== 2024 ===== */}
    <div>
      <h3 className="text-xl font-semibold text-[#2F81F7] mb-4">2024</h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* CHE */}
        <div className="p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition md:col-span-2">
          <h3 className="font-semibold text-white">
            CHE Essentials
          </h3>
          <p className="text-sm text-[#9BA7B4] mt-2">
            Gained foundational knowledge in cybersecurity practices and ethical handling of systems.
          </p>
        </div>

      </div>
    </div>

    {/* ===== 2023 ===== */}
    <div>
      <h3 className="text-xl font-semibold text-[#2F81F7] mb-4">2023</h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* NPTEL OS */}
        <div className="p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition">
          <h3 className="font-semibold text-white">
            Operating Systems Fundamentals
          </h3>
          <p className="text-sm text-[#9BA7B4]">NPTEL</p>
          <p className="text-sm text-[#9BA7B4] mt-2">
            Learned process management, memory management, scheduling, and OS concepts.
          </p>
        </div>

        {/* NPTEL DBMS */}
        <div className="p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition">
          <h3 className="font-semibold text-white">
            Database Management Systems
          </h3>
          <p className="text-sm text-[#9BA7B4]">NPTEL</p>
          <p className="text-sm text-[#9BA7B4] mt-2">
            Covered SQL, normalization, indexing, transactions, and database design.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>

      {/* RESUME */}
      <section id="resume" className="max-w-6xl mx-auto py-24 px-6 text-center">

  <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
    📄 My Resume
  </h2>

  <p className="text-[#9BA7B4] mb-12 max-w-xl mx-auto">
    Explore my professional journey including education, cybersecurity projects,
    technical skills, and hands-on experience in SOC operations.
  </p>

  <div className="grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT - DETAILS */}
    <div className="space-y-6 text-left">

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">🎓 Education</h3>
        <p className="text-[#9BA7B4] text-sm">
          B.Tech in IT (CGPA: 8.18) <br />
          Diploma in Computer Engineering (CGPA: 8.68)
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">🛡️ Cybersecurity Skills</h3>
        <p className="text-[#9BA7B4] text-sm">
          SIEM (Splunk, Chronicle), Threat Detection, Log Analysis,
          Phishing Analysis, Incident Response
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">⚙️ Tools & Tech</h3>
        <p className="text-[#9BA7B4] text-sm">
          Wireshark, Nmap, Linux, Python, SQL, Networking Fundamentals
        </p>
      </div>

    </div>

    {/* RIGHT - DOWNLOAD CARD */}
    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#121821] to-[#0B0F14] border border-[#1F2933] shadow-2xl">

      {/* Glow Effect */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#2F81F7] opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#2F81F7] opacity-20 blur-3xl rounded-full"></div>

      <h3 className="text-2xl font-semibold mb-4">Download Resume</h3>

      <p className="text-[#9BA7B4] mb-6 text-sm">
        Get the complete overview of my skills, certifications,
        projects, and experience in one document.
      </p>

      <a
  href="/Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block w-full bg-gradient-to-r from-[#2F81F7] to-[#1f6feb]
             py-3 rounded-xl font-semibold text-white
             hover:scale-105 hover:shadow-lg transition transform"
>
  ⬇ Download PDF
</a>

      <p className="text-xs text-[#6B7280] mt-4">
        Updated regularly with latest projects & skills
      </p>
    </div>

  </div>
</section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto py-24 px-6">
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
    📬 Get In Touch
  </h2>

    <p className="text-green-400 font-medium text-center mb-6">
  ✅ Open to internships & entry-level SOC roles
</p>

  <p className="text-center text-[#9BA7B4] mb-12 max-w-xl mx-auto">
    Have a question, opportunity, or just want to connect?  
    Fill out the form below and I’ll get back to you soon.
  </p>
  

  <div className="grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT SIDE INFO */}
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
        <p className="text-[#9BA7B4]">rajgadhavi2501@gmail.com</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">💼 LinkedIn</h3>
        <a 
          href="https://www.linkedin.com/in/raj-gadhavi0125/" 
          target="_blank"
          rel="noreferrer"
          className="text-[#2F81F7] hover:underline"
        >
          Connect with me
        </a>
      </div>

      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1F2933] hover:border-[#2F81F7] transition">
        <h3 className="text-lg font-semibold mb-2">💻 GitHub</h3>
        <a 
          href="https://github.com/Raj-Gadhavi-25" 
          target="_blank"
          rel="noreferrer"
          className="text-[#2F81F7] hover:underline"
        >
          View my projects
        </a>
      </div>
    </div>

    {/* FORM */}
    <form 
      onSubmit={handleSubmit}
      className="p-8 rounded-3xl bg-gradient-to-br from-[#121821] to-[#0B0F14] border border-[#1F2933] shadow-2xl space-y-6"
    >

      {/* Name */}
      <div>
        <label className="block text-sm mb-2 text-[#9BA7B4]">Full Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full p-3 rounded-lg bg-[#0B0F14] border border-[#1F2933] 
                     focus:border-[#2F81F7] focus:ring-1 focus:ring-[#2F81F7] 
                     outline-none transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm mb-2 text-[#9BA7B4]">Email Address</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full p-3 rounded-lg bg-[#0B0F14] border border-[#1F2933] 
                     focus:border-[#2F81F7] focus:ring-1 focus:ring-[#2F81F7] 
                     outline-none transition"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm mb-2 text-[#9BA7B4]">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          required
          rows="4"
          className="w-full p-3 rounded-lg bg-[#0B0F14] border border-[#1F2933] 
                     focus:border-[#2F81F7] focus:ring-1 focus:ring-[#2F81F7] 
                     outline-none transition resize-none"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#2F81F7] to-[#1f6feb] 
                   py-3 rounded-xl font-semibold text-white 
                   hover:scale-105 hover:shadow-lg transition transform"
      >
        🚀 Send Message
      </button>
    </form>

  </div>
</section>

      {/* TOP BUTTON */}
      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#2F81F7] p-3 rounded-full">
          <FaArrowUp />
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

// ===== SECTION =====
function Section({ title, items }) {
  return (
    <section id={title.toLowerCase()} className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="group p-6 bg-[#121821] border border-[#1F2933] rounded-xl hover:border-[#2F81F7] transition">
  <Icon className="text-2xl mb-3 text-[#2F81F7] transition duration-300 group-hover:scale-125 group-hover:rotate-6" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <ul className="text-sm text-[#9BA7B4] list-disc ml-4">
                {item.desc.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}