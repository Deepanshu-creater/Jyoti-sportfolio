import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { ThemeContext } from '../App';

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const contacts = [
    {
      href: 'mailto:jyotisharma.2000.vs@gmail.com',
      Icon: FaEnvelope,
      label: 'Email',
      value: 'jyotisharma.2000.vs@gmail.com',
      color: theme.accent1,
    },
    {
      href: 'tel:+919811341438',
      Icon: FaPhoneAlt,
      label: 'Phone',
      value: '+91-9811341438',
      color: theme.accent2,
    },
    {
      href: 'https://linkedin.com',
      Icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      color: '#818cf8',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 inline-block relative pb-3">
            Get In Touch
            <div
              className="absolute -bottom-0 left-0 w-full h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
            />
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            Looking for a Data Engineer to optimise pipelines or build scalable cloud solutions? Let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="p-8 rounded-3xl h-full relative overflow-hidden"
              style={{
                background: 'rgba(15,23,42,0.6)',
                border: `1px solid ${theme.accent1}22`,
                backdropFilter: 'blur(14px)',
                boxShadow: `0 8px 40px ${theme.shadow1}`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
              />
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: theme.accent2 }} />

              <h3 className="text-2xl font-semibold text-white mb-8">Contact Information</h3>

              <div className="space-y-6">
                {contacts.map(({ href, Icon, label, value, color, external }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}44`,
                        color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
                      <p
                        className="font-medium text-slate-200 transition-colors"
                        style={{ '--hover-c': color }}
                        onMouseEnter={e => (e.currentTarget.style.color = color)}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}
                      >
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl space-y-6 relative"
              style={{
                background: 'rgba(15,23,42,0.6)',
                border: `1px solid ${theme.accent1}22`,
                backdropFilter: 'blur(14px)',
              }}
            >
              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-semibold text-slate-300 mb-2 capitalize">
                    Your {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    required
                    value={formData[field]}
                    onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                    placeholder={field === 'email' ? 'you@example.com' : 'Jane Doe'}
                    className="w-full rounded-xl px-4 py-3 text-slate-200 text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(15,23,42,0.7)',
                      border: `1px solid ${theme.accent1}30`,
                    }}
                    onFocus={e => (e.target.style.borderColor = theme.accent1)}
                    onBlur={e => (e.target.style.borderColor = `${theme.accent1}30`)}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can I help you?"
                  className="w-full rounded-xl px-4 py-3 text-slate-200 text-sm outline-none resize-none transition-all duration-300"
                  style={{
                    background: 'rgba(15,23,42,0.7)',
                    border: `1px solid ${theme.accent1}30`,
                  }}
                  onFocus={e => (e.target.style.borderColor = theme.accent1)}
                  onBlur={e => (e.target.style.borderColor = `${theme.accent1}30`)}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                    : `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                  boxShadow: `0 8px 30px ${theme.shadow1}`,
                }}
              >
                {sent ? '✓ Message Sent!' : isSubmitting ? 'Sending…' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
