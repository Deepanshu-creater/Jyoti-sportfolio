import React, { useState, useEffect, createContext, useContext } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// ── Auto Theme System ──────────────────────────────────────────────────────────
export const ThemeContext = createContext({});

const themes = [
  {
    name: 'ocean',
    from: '#0f172a', via: '#0d1f3c', to: '#0f172a',
    accent1: '#38bdf8', accent2: '#34d399',
    shadow1: 'rgba(56,189,248,0.35)', shadow2: 'rgba(52,211,153,0.25)',
    particle: ['#38bdf8','#34d399','#818cf8'],
  },
  {
    name: 'violet',
    from: '#0f0a1e', via: '#1a0f3c', to: '#0f0a1e',
    accent1: '#a78bfa', accent2: '#f472b6',
    shadow1: 'rgba(167,139,250,0.35)', shadow2: 'rgba(244,114,182,0.25)',
    particle: ['#a78bfa','#f472b6','#c084fc'],
  },
  {
    name: 'ember',
    from: '#0f0a00', via: '#1e0f00', to: '#0f0a00',
    accent1: '#fb923c', accent2: '#facc15',
    shadow1: 'rgba(251,146,60,0.35)', shadow2: 'rgba(250,204,21,0.25)',
    particle: ['#fb923c','#facc15','#f97316'],
  },
  {
    name: 'aurora',
    from: '#001a0f', via: '#02231a', to: '#001a0f',
    accent1: '#2dd4bf', accent2: '#86efac',
    shadow1: 'rgba(45,212,191,0.35)', shadow2: 'rgba(134,239,172,0.25)',
    particle: ['#2dd4bf','#86efac','#34d399'],
  },
];

function App() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [prevThemeIdx, setPrevThemeIdx] = useState(null);
  const [fading, setFading] = useState(false);
  const theme = themes[themeIdx];

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPrevThemeIdx(themeIdx);
        setThemeIdx(i => (i + 1) % themes.length);
        setFading(false);
      }, 800); // cross-fade duration
    }, 6000);
    return () => clearInterval(interval);
  }, [themeIdx]);

  return (
    <ThemeContext.Provider value={{ theme, themes, themeIdx }}>
      <div
        className="relative min-h-screen text-slate-200 overflow-x-hidden font-['Inter',sans-serif] transition-all duration-[800ms]"
        style={{
          background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
        }}
      >
        {/* Ambient gradient blobs that shift with theme */}
        <div
          className="pointer-events-none fixed inset-0 -z-0 transition-opacity duration-[800ms]"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 transition-all duration-[1500ms]"
            style={{ background: theme.accent1 }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-15 transition-all duration-[1500ms]"
            style={{ background: theme.accent2 }}
          />
        </div>

        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="flex flex-col gap-24 pb-24">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Certifications />
            <Education />
            <Achievements />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;