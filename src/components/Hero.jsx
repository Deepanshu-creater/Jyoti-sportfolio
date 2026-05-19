import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { ThemeContext } from '../App';

// ── Crossing Particle that flies across screen ─────────────────────────────────
const FlyingParticle = ({ delay, theme }) => {
  const startX = Math.random() > 0.5 ? -120 : window.innerWidth + 120;
  const startY = Math.random() * window.innerHeight;
  const endX   = startX < 0 ? window.innerWidth + 120 : -120;
  const endY   = Math.random() * window.innerHeight;
  const size   = Math.random() * 6 + 3;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: theme.accent1,
        boxShadow: `0 0 ${size * 3}px ${theme.accent1}`,
        top: 0, left: 0,
      }}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{
        x: [startX, (startX + endX) / 2 + (Math.random() - 0.5) * 400, endX],
        y: [startY, (startY + endY) / 2 + (Math.random() - 0.5) * 200, endY],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: 1.8 + Math.random(), delay, ease: 'easeInOut' }}
    />
  );
};

// ── Converging particle that flies INTO the center ─────────────────────────────
const ConvParticle = ({ angle, theme, onComplete }) => {
  const radius = 420 + Math.random() * 200;
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;
  const size   = Math.random() * 5 + 2;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: theme.accent2,
        boxShadow: `0 0 ${size * 4}px ${theme.accent2}`,
        left: '50%', top: '50%',
      }}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, delay: 0.1 + Math.random() * 0.4, ease: 'easeIn' }}
      onAnimationComplete={onComplete}
    />
  );
};

// ── Boom shockwave ring ────────────────────────────────────────────────────────
const ShockwaveRing = ({ delay, theme }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none border"
    style={{
      left: '50%', top: '50%',
      width: 0, height: 0,
      borderColor: theme.accent1,
      translateX: '-50%', translateY: '-50%',
    }}
    initial={{ width: 0, height: 0, opacity: 0.9 }}
    animate={{ width: 600, height: 600, opacity: 0, translateX: '-50%', translateY: '-50%' }}
    transition={{ duration: 1.0, delay, ease: 'easeOut' }}
  />
);

// ── Terminal Boot Sequence that replaces the old stats card ───────────────────
const BOOT_LINES = [
  { text: '> Initializing data_engineer.profile …',     delay: 0.10 },
  { text: '> Loading ADF pipelines             [████████] 100%', delay: 0.55 },
  { text: '> Mounting Databricks clusters       [████████] OK  ', delay: 1.00 },
  { text: '> Syncing Apache Spark context       [████████] OK  ', delay: 1.45 },
  { text: '> Validating ETL pipeline health …   PASS ✓',         delay: 1.90 },
  { text: '> Connecting to Azure cloud …        ONLINE ✓',       delay: 2.25 },
  { text: '──────────────────────────────────────────────',       delay: 2.55 },
  { text: '  JYOTI SHARMA · Data Engineer · Ready.',             delay: 2.75, highlight: true },
];

const TerminalBoot = ({ visible, theme }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
      >
        {/* Glow burst behind card */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 80, height: 80, background: theme.accent1, filter: 'blur(60px)', opacity: 0.4 }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 10, 5] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Terminal card */}
        <motion.div
          className="relative overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(5,10,22,0.96)',
            border: `1px solid ${theme.accent1}55`,
            backdropFilter: 'blur(24px)',
            boxShadow: `0 0 80px ${theme.shadow1}, 0 0 0 1px ${theme.accent1}22`,
            borderRadius: '16px',
            minWidth: '380px',
            maxWidth: '90vw',
          }}
          initial={{ scale: 0.4, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
        >
          {/* Fake title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: `${theme.accent1}22`, background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-slate-500 font-mono tracking-wider">zsh — profile_boot.sh</span>
          </div>

          {/* Terminal body */}
          <div className="px-6 py-5 font-mono text-sm space-y-1.5">
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.25 }}
                className={line.highlight ? 'font-bold text-base' : ''}
                style={{ color: line.highlight ? theme.accent1 : '#94a3b8' }}
              >
                {line.highlight ? (
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
                  >
                    {line.text}
                  </span>
                ) : (
                  line.text
                )}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 rounded-sm mt-1"
              style={{ background: theme.accent1 }}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// keep stats available for the floating hero card
const stats = [
  { label: 'ETL Pipelines Built', value: '50+', color: '#34d399' },
  { label: 'Errors Reduced',      value: '40%', color: '#60a5fa' },
  { label: 'Hours Saved / Month', value: '50+', color: '#a78bfa' },
  { label: 'Years Experience',    value: '4+',  color: '#fb923c' },
];

// ── Hero ───────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { theme } = useContext(ThemeContext);

  // Intro animation state machine
  // phase: 'flying' → 'converging' → 'boom' → 'hero'
  const [phase, setPhase] = useState('flying');
  const [boomVisible, setBoomVisible] = useState(false);
  const convDoneCount = useRef(0);
  const totalConvParticles = 18;

  useEffect(() => {
    // after flying particles (1.8s) start converging
    const t1 = setTimeout(() => setPhase('converging'), 1800);
    // after converging, boom — show terminal boot
    const t2 = setTimeout(() => {
      setPhase('boom');
      setBoomVisible(true);
    }, 3200);
    // terminal finishes ~3s after appearing → reveal hero at 3200+3400=6600ms
    const t3 = setTimeout(() => {
      setBoomVisible(false);
      setPhase('hero');
    }, 6600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const flyAngles = Array.from({ length: totalConvParticles }, (_, i) =>
    (i / totalConvParticles) * Math.PI * 2
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 lg:px-8 overflow-hidden">

      {/* ── Stage overlay for intro phases ── */}
      <AnimatePresence>
        {phase !== 'hero' && (
          <motion.div
            className="fixed inset-0 z-20 pointer-events-none overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Flying across particles */}
            {(phase === 'flying' || phase === 'converging') &&
              Array.from({ length: 16 }).map((_, i) => (
                <FlyingParticle key={i} delay={i * 0.08} theme={theme} />
              ))}

            {/* Converging particles */}
            {phase === 'converging' &&
              flyAngles.map((angle, i) => (
                <ConvParticle key={i} angle={angle} theme={theme} />
              ))}

            {/* Shockwave rings */}
            {phase === 'boom' && (
              <>
                <ShockwaveRing delay={0}    theme={theme} />
                <ShockwaveRing delay={0.18} theme={theme} />
                <ShockwaveRing delay={0.35} theme={theme} />
              </>
            )}

            {/* Terminal boot sequence */}
            <TerminalBoot visible={boomVisible} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Hero Content ── */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={phase === 'hero' ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-start space-y-6"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: `${theme.accent1}18`,
              border: `1px solid ${theme.accent1}44`,
              color: theme.accent1,
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.accent1 }} />
            Available for opportunities
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black font-['Poppins'] tracking-tight leading-none">
            Jyoti{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}
            >
              Sharma
            </span>
          </h1>

          <div className="h-12 sm:h-14">
            <TypeAnimation
              sequence={[
                'Data Engineer', 2000,
                'Azure Specialist', 2000,
                'Databricks Expert', 2000,
                'Spark Developer', 2000,
              ]}
              wrapper="h2"
              speed={50}
              className="text-2xl sm:text-3xl font-semibold text-slate-300"
              repeat={Infinity}
            />
          </div>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            Data Engineer with <strong className="text-slate-200">4+ years</strong> building scalable ETL pipelines, optimizing big data workflows, and delivering high-performance cloud solutions across <strong style={{ color: theme.accent1 }}>Telecom</strong> and <strong style={{ color: theme.accent2 }}>Healthcare</strong>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href="models/Jyoti_Sharma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                boxShadow: `0 8px 30px ${theme.shadow1}`,
              }}
            >
              Download Resume
            </motion.a>
            <Link to="contact" smooth duration={500}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl font-semibold text-slate-200 border transition-colors"
                style={{ borderColor: `${theme.accent1}44`, background: `${theme.accent1}10` }}
              >
                Contact Me
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4">
            {[
              { href: 'https://linkedin.com', Icon: FaLinkedin, color: '#60a5fa' },
              { href: 'mailto:jyotisharma.2000.vs@gmail.com', Icon: FaEnvelope, color: theme.accent2 },
              { href: 'https://github.com', Icon: FaGithub, color: '#e2e8f0' },
            ].map(({ href, Icon, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{ color: '#94a3b8' }}
                className="hover:opacity-100 transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = color)}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                <Icon size={26} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase === 'hero' ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="hidden lg:flex relative justify-center items-center"
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse"
              style={{ background: `radial-gradient(circle, ${theme.accent1}, ${theme.accent2})` }}
            />

            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed"
              style={{ borderColor: `${theme.accent1}33` }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-12 rounded-full border"
              style={{ borderColor: `${theme.accent2}44` }}
            />

            {/* Orbiting dots */}
            {[0, 90, 180, 270].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? theme.accent1 : theme.accent2,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? theme.accent1 : theme.accent2}`,
                  top: '50%', left: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{ rotate: [deg, deg + 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
              />
            ))}

            {/* Center floating data card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 m-auto w-56 h-56 rounded-2xl overflow-hidden flex flex-col justify-center items-center"
              style={{
                background: 'rgba(15,23,42,0.85)',
                border: `1px solid ${theme.accent1}33`,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 24px 60px ${theme.shadow1}`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }} />
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent1 }}>Pipeline Health</div>
              <div className="grid grid-cols-2 gap-4 w-full px-5">
                {stats.slice(0,4).map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-[9px] text-slate-400 text-center leading-tight mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={phase === 'hero' ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0 }}
        transition={{ opacity: { duration: 0.5 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
      >
        <Link to="about" smooth duration={500}>
          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full"
              style={{ background: theme.accent1 }}
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
