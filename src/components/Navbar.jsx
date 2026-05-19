import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { ThemeContext } from '../App';

const navLinks = [
  { name: 'Home',       to: 'home'       },
  { name: 'About',      to: 'about'      },
  { name: 'Skills',     to: 'skills'     },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects',   to: 'projects'   },
  { name: 'Contact',    to: 'contact'    },
];

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="home"
            smooth
            duration={500}
            className="text-2xl font-black font-['Poppins'] cursor-pointer bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}
          >
            JS.
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={link.to}
                smooth
                duration={500}
                className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors cursor-pointer relative group"
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: theme.accent1 }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{
              border: `1px solid ${theme.accent1}55`,
              color: theme.accent1,
              background: `${theme.accent1}12`,
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/60 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth
                  duration={500}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-300 cursor-pointer hover:text-slate-100 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
