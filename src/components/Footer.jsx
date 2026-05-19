import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { ThemeContext } from '../App';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const socials = [
    { href: 'https://linkedin.com', Icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'mailto:jyotisharma.2000.vs@gmail.com', Icon: FaEnvelope, label: 'Email' },
    { href: 'https://github.com', Icon: FaGithub, label: 'GitHub' },
  ];

  return (
    <footer
      className="border-t pt-12 pb-8"
      style={{
        borderColor: `${theme.accent1}18`,
        background: 'rgba(5,10,25,0.6)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link
            to="home"
            smooth
            duration={500}
            className="text-2xl font-black font-['Poppins'] cursor-pointer bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }}
          >
            JS.
          </Link>

          <div className="flex items-center gap-6">
            {socials.map(({ href, Icon, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="text-slate-400 transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = theme.accent1)}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        <div
          className="border-t pt-8 text-center text-sm text-slate-500"
          style={{ borderColor: `${theme.accent1}12` }}
        >
          <p>&copy; {new Date().getFullYear()} Jyoti Sharma · Data Engineer</p>
          <p className="mt-1">Built with React, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
