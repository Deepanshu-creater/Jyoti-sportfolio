import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const certs = [
  { name: 'Microsoft Azure Fundamentals', code: 'AZ-900', color1: '#38bdf8', color2: '#818cf8' },
  { name: 'Databricks Certified Data Engineer', code: 'Associate', color1: '#fb923c', color2: '#facc15' },
];

const Certifications = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold font-['Poppins'] text-slate-100 mb-10 text-center"
        >
          Certifications
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="flex-1 max-w-md p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(15,23,42,0.6)',
                border: `1px solid ${theme.accent1}22`,
                backdropFilter: 'blur(14px)',
                boxShadow: `0 8px 32px ${theme.shadow1}`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(90deg, ${cert.color1}, ${cert.color2})` }}
              />
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${cert.color1}, ${cert.color2})` }} />

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cert.color1}20`, border: `1px solid ${cert.color1}44` }}
                >
                  <svg className="w-6 h-6" fill="none" stroke={cert.color1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                  <p className="font-semibold" style={{ color: cert.color1 }}>{cert.code}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
