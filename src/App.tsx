/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  BrainCircuit, 
  Layout, 
  Cpu,
  ChevronRight,
  Terminal,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

// --- Constants & Data ---

const RESUME_DATA = {
  name: "Samyuktha MA",
  title: "AI & Data Engineer",
  summary: "AI & Data Analytics undergraduate with strong foundations in machine learning, data analysis, explainable AI, and production-oriented AI systems. Hands-on experience in ML validation, feature engineering, real time data visualization, dashboards, prompt engineering, and FinTech-style analytics across industrial, telecom, and aerospace research environments.",
  education: {
    college: "Saveetha University",
    degree: "BSc Artificial Intelligence",
    period: "2023 – 2026"
  },
  skills: [
    { category: "Programming & Analytics", items: ["Python", "SQL (MS SQL Server)", "Advanced Excel", "SPSS"], icon: <Terminal className="w-5 h-5" /> },
    { category: "Machine Learning & AI", items: ["Supervised & Unsupervised Learning", "Feature Engineering", "Model Validation", "Neural Networks", "Random Forest", "SVM", "KNN", "Generative AI"], icon: <BrainCircuit className="w-5 h-5" /> },
    { category: "Prompt Engineering & LLMs", items: ["System prompt design", "Structured AI outputs", "Explainability-focused", "Risk-aware"], icon: <Cpu className="w-5 h-5" /> },
    { category: "Data Visualization & BI", items: ["Power BI", "Interactive Dashboards", "Data Cleaning & Transformation", "Real-Time Visualizations"], icon: <Database className="w-5 h-5" /> },
    { category: "Web & UI", items: ["HTML", "CSS", "React (Functional Components)", "TypeScript"], icon: <Layout className="w-5 h-5" /> },
  ],
  experience: [
    {
      company: "SHAR SDSC–ISRO",
      role: "Range Operations Intern",
      period: "Dec 2025 – Jan 2026",
      location: "Sriharikota",
      description: [
        "Improved operational monitoring reliability by developing real-time telemetry visualization workflows for range operations environments.",
        "Enhanced the accuracy and interpretability of high-frequency telemetry analysis through curve smoothing, interpolation, and preprocessing techniques."
      ]
    },
    {
      company: "Nokia Networks & Solutions",
      role: "Testing Analyst Intern",
      period: "Jul 2025 – Aug 2025",
      location: "Chennai",
      description: [
        "Increased dataset reliability and model consistency by validating ML datasets and identifying defects across telecom analytics pipelines.",
        "Reduced data quality issues impacting analytics performance through structured testing and defect documentation.",
        "Strengthened collaboration between testing and engineering teams, contributing to more stable and trustworthy ML outputs."
      ]
    },
    {
      company: "Alstom Transport India",
      role: "Production Planner & Industrial Operations Intern",
      period: "May 2025 – Jun 2025",
      location: "Sricity",
      description: [
        "Contributed to KPI improvement initiatives by analyzing production and operational datasets to identify workflow inefficiencies and performance gaps.",
        "Improved manufacturing performance visibility through time-study analysis, operational reporting, and data-driven process assessments."
      ]
    }
  ],
  projects: [
    {
      title: "Nova Spark – FinTech AI Platform",
      description: "Built an AI-powered FinTech single-page application with a conversational assistant delivering explainable, risk-aware market analysis and simulated trade forecasting.",
      tech: ["React 19", "TypeScript", "Tailwind CSS", "Recharts", "Google Gemini"],
      link: "https://samyukthama.github.io/nova-spark/",
      github: "https://github.com/SamyukthaMA/nova-spark",
      category: "AI",
      status: "Deployed"
    },
    {
      title: "Remote Factory Digital Twin",
      description: "Developing a smart factory digital twin using large-scale IoT sensor data (1.5M+ records). Automated data cleaning and leakage-aware feature engineering.",
      tech: ["IoT", "Predictive Maintenance", "RUL Modeling", "Power BI"],
      link: "#",
      category: "Data Visualization",
      status: "In Progress"
    },
    {
      title: "Music Album Popularity Prediction",
      description: "Evaluated and compared ML models (LR, KNN, SVM, Random Forest, ANN, CatBoost, GNN) with statistical analysis using SPSS.",
      tech: ["Python", "SPSS", "ML Research"],
      link: "https://github.com/SamyukthaMA/My-ML-Project",
      category: "Web Development",
      status: "Completed"
    }
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/samyuktha-anand-raj-6a1721278/", icon: <Linkedin className="w-6 h-6" /> },
    { name: "GitHub", url: "https://github.com/SamyukthaMA", icon: <Github className="w-6 h-6" /> },
    { name: "Email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=samyukthaanandraj@gmail.com", icon: <Mail className="w-6 h-6" /> }
  ]
};

// --- Components ---

const SideNav = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const [active, setActive] = useState('intro');
  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'profile', label: 'Profile' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Exp' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Capabilities' },
    { id: 'connect', label: 'Connect' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observers = navItems.map(item => {
      const el = document.getElementById(item.id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(item.id);
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
    <div className={`fixed right-0 top-0 bottom-0 w-32 hidden lg:flex flex-col items-center justify-center py-12 z-50 border-white/5 backdrop-blur-sm shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)]`}>
      <div className="flex flex-col gap-4 items-end pr-8 mb-12">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center gap-4 text-right"
          >
            <span className={`text-[10px] uppercase tracking-[0.3em] font-mono transition-all duration-300 pointer-events-none whitespace-nowrap ${
              active === item.id ? 'text-neon-red opacity-100' : 'text-white/40 group-hover:text-white/80 group-hover:opacity-100'
            }`}>
              {item.label}
            </span>
            <div className={`w-1 h-3 transition-all duration-300 ${
              active === item.id ? 'bg-neon-red shadow-[0_0_10px_rgba(255,0,51,0.8)]' : 'bg-white/10 group-hover:bg-white/30'
            }`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-8">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-all ${
            theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <div className="flex flex-col gap-5">
          {RESUME_DATA.socials.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target={social.url.startsWith('mailto:') ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-white/10 hover:text-neon-red transition-all duration-300 hover:scale-110"
            >
              {React.cloneElement(social.icon as React.ReactElement, { className: "w-4 h-4" })}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const IntroHero = ({ theme }: { theme: 'dark' | 'light' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 20, y: x * 20 });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div id="intro" className={`relative min-h-screen flex items-center justify-center overflow-hidden lg:-mr-32 font-sans transition-colors duration-1000 ${
      theme === 'dark' ? 'bg-jet-black' : 'bg-white'
    }`}>
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-24 grid grid-cols-12 gap-4 items-center"
      >
        {/* Left Side: Vertical Role Title */}
        <div className="hidden md:flex col-span-2 h-full flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="rotate-[-90deg] origin-left whitespace-nowrap translate-y-24 translate-x-12"
          >
            <div className="flex flex-col gap-3">
              <p className={`text-[10px] lg:text-[13px] font-mono uppercase tracking-[0.8em] transition-colors duration-500 ${
                theme === 'dark' ? 'text-white/60' : 'text-black/60'
              }`}>
                AI & Data Engineer <span className="text-neon-red neon-glow ml-2">/</span>
              </p>
              <p className={`text-[9px] lg:text-[11px] font-mono uppercase tracking-[0.5em] ml-4 transition-colors duration-500 ${
                theme === 'dark' ? 'text-white/30' : 'text-black/30'
              }`}>
                Based in India
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Main Greeting */}
        <div className="col-span-12 md:col-span-10 relative md:pl-24">
          <div className="flex flex-col items-start space-y-1 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className={`text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tight leading-none transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                hello<span className="text-neon-red">.</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className={`text-4xl md:text-6xl lg:text-[80px] font-medium tracking-tight leading-none transition-colors duration-500 ${
                theme === 'dark' ? 'text-white/80' : 'text-black/80'
              }`}>I am</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: rotate.x,
                rotateY: rotate.y,
                scale: isHovered ? 1.05 : 1,
                z: isHovered ? 50 : 0
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              transition={{ 
                opacity: { duration: 1, delay: 0.6 },
                y: { duration: 1, delay: 0.6 },
                default: { type: "spring", stiffness: 150, damping: 15 }
              }}
              className="cursor-pointer relative z-20"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <h1 className={`text-6xl md:text-[80px] lg:text-[110px] font-black tracking-tighter leading-[0.85] select-none transition-all duration-500 hover:text-neon-red ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Samyuktha
              </h1>
            </motion.div>
          </div>

          {/* Red Accents - More Faded */}
          <div className="absolute inset-0 pointer-events-none">
             <motion.div
               animate={{ 
                 rotate: [0, 360],
                 y: [0, -30, 0]
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute -top-16 right-0 md:right-1/4 w-12 h-12 rounded-2xl border-[3px] border-neon-red/10 flex items-center justify-center p-2"
             >
                <div className="w-full h-full bg-neon-red/[0.05] rounded-lg" />
             </motion.div>

             <motion.div
               animate={{ 
                 scale: [1, 1.1, 1],
                 x: [0, 20, 0]
               }}
               transition={{ duration: 8, repeat: Infinity }}
               className="absolute top-1/2 -left-20 w-10 h-10 rounded-full border-2 border-neon-red/[0.08] flex items-center justify-center"
             >
                <div className="w-3 h-3 bg-neon-red/[0.05] rounded-full" />
             </motion.div>

             {/* Faded lines */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.1 }}
               className="absolute -bottom-10 right-20 w-[1px] h-32 bg-gradient-to-b from-transparent via-neon-red to-transparent"
             />
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.1 }}
               className="absolute top-40 -right-10 w-32 h-[1px] bg-gradient-to-r from-transparent via-neon-red to-transparent"
             />
          </div>
        </div>
      </motion.div>

      {/* Background Large "MA" or "DESIGN" Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.06] select-none pointer-events-none transition-all duration-1000">
         <h2 className="text-[18vw] font-bold uppercase tracking-tighter">SAMYUKTHA</h2>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-12 flex flex-col items-start gap-4"
      >
         <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-mono">Portfolio 2026</span>
         <div className="w-16 h-[1px] bg-white/10" />
      </motion.div>
    </div>
  );
};


const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const quote = "Every scroll tells a story.";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-jet-black flex flex-col items-center justify-center p-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        <h1 className="text-xl md:text-2xl font-display font-light tracking-[0.6em] uppercase text-center text-white/80">
          {quote.split('').map((char, index) => {
            const charProgress = (index / quote.length) * 100;
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: progress >= charProgress ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {char}
              </motion.span>
            );
          })}
        </h1>
        
        <div className="w-64 md:w-96 h-0.5 bg-white/5 mt-12 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-red shadow-[0_0_20px_rgba(255,0,51,1)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Components ---

const BackgroundParticles = ({ theme }: { theme: 'dark' | 'light' }) => {
  const particles = Array.from({ length: 20 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-neon-red/[0.03]' : 'bg-neon-red/[0.02]'}`}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            x: [null, Math.random() * 100 + '%'],
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            width: Math.random() * 300 + 50 + 'px', 
            height: Math.random() * 300 + 50 + 'px',
            filter: 'blur(100px)'
          }}
        />
      ))}
    </div>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const [active, setActive] = useState('intro');
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'profile', label: 'Profile' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'connect', label: 'Connect' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b px-6 py-4 flex lg:hidden items-center justify-between transition-colors duration-500 ${
          theme === 'dark' 
            ? 'bg-jet-black/80 border-neon-red/10' 
            : 'bg-white/80 border-neon-red/20'
        }`}
      >
        <div className={`text-xl font-display font-light tracking-tighter uppercase ${
          theme === 'dark' ? 'text-neon-red neon-glow' : 'text-neon-red'
        }`}>
          Samyuktha MA
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-light transition-colors relative group py-2 ${
                active === item.id 
                  ? 'text-neon-red' 
                  : theme === 'dark' ? 'text-white/60 hover:text-neon-red' : 'text-black/60 hover:text-neon-red'
              }`}
            >
              {item.label}
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neon-red shadow-[0_0_10px_rgba(255,0,51,0.8)]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </button>
          ))}
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all ${
              theme === 'dark' ? 'bg-white/5 text-white/60 hover:text-neon-red' : 'bg-black/5 text-black/60 hover:text-neon-red'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${
              theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'dark' ? 'text-neon-red' : 'text-neon-red'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8 ${
              theme === 'dark' ? 'bg-jet-black' : 'bg-white'
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-2xl font-light tracking-widest uppercase ${
                  active === item.id ? 'text-neon-red' : theme === 'dark' ? 'text-white/60' : 'text-black/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Section = ({ id, title, children, className = "", theme = "dark" }: { id: string, title?: string, children: React.ReactNode, className?: string, theme?: 'dark' | 'light' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section 
      id={id} 
      ref={ref}
      className={`min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 relative ${className}`}
    >
      {title && (
        <div className="mb-16 relative">
          <ParallaxElement offset={80} className="absolute -top-12 left-0 select-none whitespace-nowrap pointer-events-none">
            <motion.h2 
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`text-6xl md:text-8xl font-display font-light tracking-tighter uppercase ${
                theme === 'dark' ? 'text-white/[0.05]' : 'text-black/[0.05]'
              }`}
            >
              {title}
            </motion.h2>
          </ParallaxElement>
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className={`text-4xl md:text-6xl font-display font-light tracking-tight relative z-10 flex items-center gap-16 pl-6 ${
              theme === 'dark' ? 'drop-shadow-[0_0_10px_rgba(255,0,51,0.2)]' : ''
            }`}
          >
            <span className="text-neon-red neon-glow opacity-30 select-none shrink-0">/</span> 
            <span className={`transition-all duration-300 cursor-default hover:text-neon-red whitespace-nowrap leading-relaxed ${
              theme === 'dark' ? 'text-white/90 hover:neon-glow' : 'text-black/90'
            }`}>
              {title}
            </span>
          </motion.h2>
        </div>
      )}
      <ParallaxElement offset={30} className="relative z-10">
        {children}
      </ParallaxElement>
    </section>
  );
};
const ScrollReveal = ({
  children,
  direction = "left",
  className = "",
  delay = 0,
  threshold = 0.2
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down" | "zoom-in" | "zoom-out";
  className?: string;
  delay?: number;
  threshold?: number;
  key?: React.Key;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: false });

  const getInitial = () => {
    switch (direction) {
      case "left": return { x: -60, opacity: 0 };
      case "right": return { x: 60, opacity: 0 };
      case "up": return { y: 60, opacity: 0 };
      case "down": return { y: -60, opacity: 0 };
      case "zoom-in": return { scale: 0.9, opacity: 0 };
      case "zoom-out": return { scale: 1.1, opacity: 0 };
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : getInitial()}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxElement = ({ children, offset = 40, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
const Hero = ({ theme }: { theme: 'dark' | 'light' }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 20, y: x * 20 });
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <Section id="profile" className="items-center text-center pb-0 pt-16" theme={theme}>
      <div ref={ref} className="max-w-4xl mx-auto flex flex-col items-center relative">
        <ParallaxElement offset={30} className="relative w-full max-w-2xl aspect-video mb-8 cursor-pointer group z-10">
          <motion.div
            style={{ opacity, scale: imgScale }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ 
                rotateX: rotate.x, 
                rotateY: rotate.y,
                scale: scale,
                z: scale > 1 ? 40 : 0
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              {/* Border Frame */}
              <div className={`absolute -inset-1 border border-neon-red/10 rounded-sm transition-all duration-700 ${
                theme === 'dark' ? 'shadow-[0_0_30px_rgba(255,0,51,0.05)] group-hover:shadow-[0_0_50px_rgba(255,0,51,0.1)]' : ''
              }`} style={{ transform: "translateZ(5px)" }} />
              
              {/* Image Container */}
              <div className={`relative w-full h-full rounded-sm overflow-hidden border transition-colors duration-500 ${
                theme === 'dark' ? 'bg-jet-black border-white/5' : 'bg-white border-black/5'
              }`} style={{ transform: "translateZ(10px)" }}>
                
                <img 
                  src="./profile.jpg" 
                  alt="Samyuktha MA" 
                  className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.8] hover:grayscale-0 transition-all duration-1000"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/samyuktha-landscape/1600/900";
                  }}
                />

                {/* Soft Edge Blending Gradients */}
                <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r transition-all duration-500 from-jet-black via-jet-black/40 to-transparent z-10 ${
                  theme === 'dark' ? 'from-jet-black' : 'from-white via-white/40'
                }`} />
                <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l transition-all duration-500 from-jet-black via-jet-black/40 to-transparent z-10 ${
                  theme === 'dark' ? 'from-jet-black' : 'from-white via-white/40'
                }`} />
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b transition-all duration-500 from-jet-black to-transparent opacity-80 z-10 ${
                  theme === 'dark' ? 'from-jet-black' : 'from-white'
                }`} />
                <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t transition-all duration-500 from-jet-black to-transparent opacity-90 z-10 ${
                  theme === 'dark' ? 'from-jet-black' : 'from-white'
                }`} />
              </div>
            </motion.div>
          </motion.div>
        </ParallaxElement>
      </div>
    </Section>
  );
};

const Summary = ({ theme }: { theme: 'dark' | 'light' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [text, setText] = useState("");
  const fullText = RESUME_DATA.summary;

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 10);
      return () => clearInterval(interval);
    } else {
      setText("");
    }
  }, [isInView, fullText]);

  return (
    <Section id="summary" title="Summary" theme={theme} className="pt-8 pb-12">
      <ScrollReveal direction="left">
        <div className="max-w-4xl min-h-[150px] mx-auto text-center" ref={ref}>
          <p className={`text-lg md:text-xl leading-relaxed font-light ${
            theme === 'dark' ? 'text-white/80' : 'text-black/80'
          }`}>
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-neon-red ml-1 align-middle"
            />
          </p>
        </div>
      </ScrollReveal>
    </Section>
  );
};

const Education = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <Section id="education" title="Education" theme={theme}>
      <ScrollReveal direction="left" className="max-w-4xl">
        <motion.div 
          whileHover={{ 
            scale: 1.02,
            backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.03)",
            borderColor: "rgba(255, 0, 51, 0.4)",
            boxShadow: theme === 'dark' ? "0 0 40px rgba(255, 0, 51, 0.15)" : "0 0 20px rgba(255, 0, 51, 0.1)"
          }}
          className={`backdrop-blur-2xl border p-8 md:p-12 rounded-3xl border-l-4 border-l-neon-red relative overflow-hidden group transition-all duration-500 ${
            theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'
          }`}
        >
          <div className={`absolute top-0 right-0 p-8 transition-colors ${
            theme === 'dark' ? 'text-white/[0.02] group-hover:text-neon-red/[0.05]' : 'text-black/[0.02] group-hover:text-neon-red/[0.05]'
          }`}>
            <BrainCircuit className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className={`text-2xl md:text-3xl font-light tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white group-hover:text-neon-red' : 'text-black group-hover:text-neon-red'
              }`}>{RESUME_DATA.education.college}</h3>
              <span className={`font-mono px-4 py-1 rounded-full text-sm transition-all ${
                theme === 'dark' ? 'text-white/40 group-hover:text-neon-red bg-white/5 group-hover:bg-neon-red/10' : 'text-black/40 group-hover:text-neon-red bg-black/5 group-hover:bg-neon-red/10'
              }`}>{RESUME_DATA.education.period}</span>
            </div>
            <p className={`text-xl font-light mb-2 transition-colors ${
              theme === 'dark' ? 'text-white/60 group-hover:text-neon-red' : 'text-black/60 group-hover:text-neon-red'
            }`}>{RESUME_DATA.education.degree}</p>
            <p className={`${theme === 'dark' ? 'text-white/20' : 'text-black/20'} text-sm uppercase tracking-widest`}>Full-Time Undergraduate Program</p>
          </div>
        </motion.div>
      </ScrollReveal>
    </Section>
  );
};

const Skills = ({ theme }: { theme: 'dark' | 'light' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <Section id="skills" title="Skills" theme={theme}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
       {RESUME_DATA.skills.map((skill, idx) => (
  <ScrollReveal
    key={skill.category}
    direction={idx % 2 === 0 ? "left" : "right"}
  >
    <motion.div
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        backgroundColor: theme === 'dark'
          ? "rgba(255, 255, 255, 0.06)"
          : "rgba(0, 0, 0, 0.03)",
        borderColor: "rgba(255, 0, 51, 0.4)"
      }}
      className={`backdrop-blur-2xl border p-8 rounded-2xl group transition-all duration-500 relative overflow-hidden ${
        theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'
      }`}
    >
      {/* 👇 KEEP ALL YOUR EXISTING CONTENT INSIDE */}
      <div className={`absolute top-0 right-0 p-4 transition-colors ${
        theme === 'dark'
          ? 'text-white/5 group-hover:text-neon-red/20'
          : 'text-black/5 group-hover:text-neon-red/20'
      }`}>
        {skill.icon}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${
          theme === 'dark'
            ? 'bg-white/5 text-white/40 group-hover:bg-neon-red group-hover:text-white'
            : 'bg-black/5 text-black/40 group-hover:bg-neon-red group-hover:text-white'
        }`}>
          {skill.icon}
        </div>
        <h3 className={`text-xl font-light ${
          theme === 'dark'
            ? 'text-white group-hover:text-neon-red'
            : 'text-black group-hover:text-neon-red'
        }`}>
          {skill.category}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className={`px-3 py-1 rounded-full text-sm ${
              theme === 'dark'
                ? 'bg-white/5 text-white/40 border border-white/5 group-hover:border-neon-red/30 group-hover:text-white'
                : 'bg-black/5 text-black/40 border border-black/5 group-hover:border-neon-red/30 group-hover:text-black'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  </ScrollReveal>
))}
      </div>
    </Section>
  );
};

const ProjectCard = ({ project, index, theme }: { project: any; index: number; theme: 'dark' | 'light'; key?: React.Key }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react')) return <Layout className="w-3 h-3" />;
    if (t.includes('typescript') || t.includes('javascript') || t.includes('ts')) return <Code2 className="w-3 h-3" />;
    if (t.includes('python')) return <Terminal className="w-3 h-3" />;
    if (t.includes('gemini') || t.includes('ai') || t.includes('ml') || t.includes('predictive')) return <BrainCircuit className="w-3 h-3" />;
    if (t.includes('bi') || t.includes('data') || t.includes('recharts') || t.includes('sql')) return <Database className="w-3 h-3" />;
    if (t.includes('iot')) return <Cpu className="w-3 h-3" />;
    return <ChevronRight className="w-3 h-3" />;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isPlaceholder = project.link === "#";

  return (
    <motion.div 
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        scale: isHovered ? 1.03 : 1,
        z: isHovered ? 50 : 0
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`backdrop-blur-2xl border p-8 rounded-3xl transition-all group relative overflow-hidden ${
        theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'
      }`}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-neon-red/0 blur-3xl rounded-full group-hover:bg-neon-red/20 transition-all" />
      
      <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(30px)" }}>
        <h4 className={`text-2xl font-light transition-all pr-4 ${
          theme === 'dark' ? 'text-white group-hover:text-neon-red group-hover:neon-glow' : 'text-black group-hover:text-neon-red'
        }`}>
          {project.title}
        </h4>
        <div className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-mono whitespace-nowrap ${
          project.status === 'Deployed' ? 'bg-green-500/20 text-green-400' :
          project.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {project.status}
        </div>
      </div>

      <p className={`mb-10 leading-relaxed transition-colors font-light min-h-[80px] ${
        theme === 'dark' ? 'text-white/60 group-hover:text-white/90' : 'text-black/60 group-hover:text-black/90'
      }`} style={{ transform: "translateZ(20px)" }}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-10" style={{ transform: "translateZ(25px)" }}>
        {project.tech.map((t: string) => (
          <span key={t} className={`text-[10px] uppercase tracking-widest font-mono px-3 py-1 rounded-full border transition-all flex items-center gap-2 ${
            theme === 'dark' ? 'bg-white/5 text-white/40 border-white/5 group-hover:border-neon-red/20 group-hover:text-neon-red' : 'bg-black/5 text-black/40 border-black/5 group-hover:border-neon-red/20 group-hover:text-neon-red'
          }`}>
            <span className="opacity-50 group-hover:opacity-100">{getTechIcon(t)}</span>
            {t}
          </span>
        ))}
      </div>
      
      <div className="flex gap-6" style={{ transform: "translateZ(40px)" }}>
        {isPlaceholder ? (
          <div className={`inline-flex items-center gap-2 text-sm font-light uppercase tracking-widest font-mono ${
            theme === 'dark' ? 'text-white/20' : 'text-black/20'
          }`}>
            <span className="animate-pulse">Coming Soon</span>
          </div>
        ) : (
          <motion.a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5, color: "#FF0033" }}
            className={`inline-flex items-center gap-2 text-sm font-light uppercase tracking-widest transition-colors ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}
          >
            Live Demo <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}

        {project.github && (
          <motion.a 
            href={project.github} 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5, color: "#FF0033" }}
            className={`inline-flex items-center gap-2 text-sm font-light uppercase tracking-widest transition-colors ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}
          >
            Github <Github className="w-4 h-4" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const Experience = ({ theme }: { theme: 'dark' | 'light' }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'Data Visualization', 'Web Development'];

  const filteredProjects = RESUME_DATA.projects.filter(project => 
    filter === 'All' || project.category === filter
  );

  return (
    <Section id="experience" title="Experience" theme={theme}>
      <div className="space-y-12">
        {RESUME_DATA.experience.map((exp, idx) => (
          <ScrollReveal
            key={idx}
            direction={idx % 2 === 0 ? "left" : "right"}
          >
            <div
              className={`relative pl-8 md:pl-12 border-l-2 transition-colors group ${
                theme === 'dark'
                  ? 'border-white/5 hover:border-neon-red'
                  : 'border-black/5 hover:border-neon-red'
              }`}
            >
              <div
                className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full transition-all ${
                  theme === 'dark'
                    ? 'bg-jet-black border-white/10 group-hover:border-neon-red group-hover:bg-neon-red shadow-[0_0_10px_rgba(255,0,51,0)] group-hover:shadow-[0_0_15px_rgba(255,0,51,0.5)]'
                    : 'bg-white border-black/10 group-hover:border-neon-red group-hover:bg-neon-red'
                }`}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3
                    className={`text-2xl font-light tracking-tight transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-neon-red'
                        : 'text-black group-hover:text-neon-red'
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className={`text-lg font-light transition-colors ${
                      theme === 'dark'
                        ? 'text-white/40 group-hover:text-white/80'
                        : 'text-black/40 group-hover:text-black/80'
                    }`}
                  >
                    {exp.company}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`font-mono text-sm ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                    {exp.period}
                  </p>
                  <p className={`${theme === 'dark' ? 'text-white/10' : 'text-black/10'} text-xs uppercase tracking-widest`}>
                    {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 font-light transition-colors ${
                      theme === 'dark'
                        ? 'text-white/40 group-hover:text-white/90'
                        : 'text-black/40 group-hover:text-black/90'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 text-neon-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
};

const Projects = ({ theme }: { theme: 'dark' | 'light' }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'Data Visualization', 'Web Development'];

  const filteredProjects = RESUME_DATA.projects.filter(project => 
    filter === 'All' || project.category === filter
  );

  return (
    <Section id="projects" title="Projects" theme={theme}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full text-xs uppercase tracking-widest font-mono border transition-all ${
                filter === cat
                  ? 'bg-neon-red border-neon-red text-white'
                  : theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white/40 hover:border-neon-red/50 hover:text-white'
                    : 'bg-black/5 border-black/10 text-black/40 hover:border-neon-red/50 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.title}
              direction={idx % 2 === 0 ? "left" : "right"}
            >
              <ProjectCard project={project} index={idx} theme={theme} />
            </ScrollReveal>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

const ResumeDownload = ({ theme }: { theme: 'dark' | 'light' }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 3000);
  };

  return (
    <Section id="resume" className="items-center text-center" theme={theme}>
      <ScrollReveal direction="up" className="max-w-2xl">
        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 0, 51, 0.4)" }}
          className={`backdrop-blur-2xl p-12 rounded-3xl border hover:border-neon-red/20 relative overflow-hidden group transition-all duration-700 ${
            theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'
          }`}
        >
          <AnimatePresence>
            {downloading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-neon-red text-white px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest shadow-lg"
              >
                Download Started
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] rounded-full group-hover:bg-neon-red/10 transition-all ${
            theme === 'dark' ? 'bg-neon-red/0' : 'bg-neon-red/0'
          }`} />
          <div className={`absolute -bottom-24 -left-24 w-64 h-64 blur-[100px] rounded-full group-hover:bg-neon-red/10 transition-all ${
            theme === 'dark' ? 'bg-neon-red/0' : 'bg-neon-red/0'
          }`} />
          
          <h2 className={`text-4xl md:text-5xl font-display font-light mb-6 transition-all duration-300 cursor-default ${
              theme === 'dark' ? 'text-white/90 hover:text-neon-red hover:neon-glow drop-shadow-[0_0_10px_rgba(255,0,51,0.2)]' : 'text-black/90 hover:text-neon-red'
            }`}
          >
            Ready to work together?
          </h2>
          <p className={`mb-10 text-lg transition-colors font-light ${
              theme === 'dark' ? 'text-white/40 group-hover:text-white/80' : 'text-black/40 group-hover:text-black/80'
            }`}
          >
            Download my full resume to see a detailed breakdown of my experience, education, and technical expertise.
          </p>
          
          <motion.a
            href="./resume.pdf"
            download="Samyuktha_MA_Resume.pdf"
            onClick={handleDownload}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 51, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-10 py-5 rounded-2xl font-light text-xl flex items-center gap-3 mx-auto shadow-2xl transition-all duration-500 ${
              theme === 'dark' ? 'bg-white/5 group-hover:bg-neon-red text-white/40 group-hover:text-white' : 'bg-black/5 group-hover:bg-neon-red text-black/40 group-hover:text-white'
            }`}
          >
            <Download className="w-6 h-6" />
            Download Resume
          </motion.a>
        </motion.div>
      </ScrollReveal>
    </Section>
  );
};

const Connect = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <Section id="connect" title="Let's Connect" theme={theme}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
        {RESUME_DATA.socials.map((social, idx) => (
          <ScrollReveal 
            key={social.name} 
            direction={idx === 0 ? "left" : idx === 2 ? "right" : "up"}
            delay={idx * 0.1}
          >
            <motion.a
              href={social.url}
              target={social.url.startsWith('mailto:') ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ 
                y: -10, 
                scale: 1.05, 
                backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.03)", 
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 0, 51, 0.4)",
                boxShadow: theme === 'dark' ? "0 0 40px rgba(0, 0, 0, 0.4)" : "0 0 20px rgba(0, 0, 0, 0.1)"
              }}
              className={`backdrop-blur-2xl border p-10 rounded-3xl flex flex-col items-center gap-4 group transition-all duration-500 ${
                theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'
              }`}
            >
              <div className={`p-5 rounded-2xl transition-all duration-500 ${
                theme === 'dark' ? 'bg-white/5 text-white/20 group-hover:bg-neon-red group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255, 0, 51, 0.5)]' : 'bg-black/5 text-black/20 group-hover:bg-neon-red group-hover:text-white'
              }`}>
                {social.icon}
              </div>
              <span className={`text-lg font-light tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white/40 group-hover:text-neon-red' : 'text-black/40 group-hover:text-neon-red'
              }`}>{social.name}</span>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
      
      <ScrollReveal direction="up" delay={0.4}>
        <footer className={`pt-12 border-t font-mono text-[10px] tracking-[0.3em] uppercase ${
          theme === 'dark' ? 'border-white/10 text-white/10' : 'border-black/10 text-black/20'
        }`}>
          Samyuktha MA &bull; {new Date().getFullYear()}
        </footer>
      </ScrollReveal>
    </Section>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`transition-colors duration-1000 selection:bg-neon-red selection:text-white min-h-screen overflow-x-hidden ${
      theme === 'dark' ? 'bg-jet-black text-white' : 'bg-white text-black'
    }`}>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SideNav theme={theme} toggleTheme={toggleTheme} />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          {/* Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-neon-red z-[60] origin-left shadow-[0_0_10px_rgba(255,0,51,0.8)]"
            style={{ scaleX }}
          />

          <main className={`relative lg:pr-32 transition-colors duration-1000 ${
            theme === 'dark' ? 'bg-jet-black' : 'bg-white'
          }`}>
            {/* Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
              <div className={`absolute top-[10%] -left-20 w-96 h-96 blur-[150px] rounded-full transition-colors duration-1000 ${
                theme === 'dark' ? 'bg-neon-red/[0.02]' : 'bg-neon-red/10'
              }`} />
              <div className={`absolute bottom-[20%] -right-20 w-96 h-96 blur-[150px] rounded-full transition-colors duration-1000 ${
                theme === 'dark' ? 'bg-neon-red/[0.02]' : 'bg-neon-red/10'
              }`} />
            </div>

            <IntroHero theme={theme} />
            <Hero theme={theme} />
            <Summary theme={theme} />
            <Education theme={theme} />
            <Skills theme={theme} />
            <Experience theme={theme} />
            <Projects theme={theme} />
            <ResumeDownload theme={theme} />
            <Connect theme={theme} />
          </main>
        </motion.div>
      )}
    </div>
  );
}
