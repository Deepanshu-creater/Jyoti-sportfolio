import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const Education = () => {
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
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto p-8 md:p-10 rounded-2xl relative overflow-hidden"
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
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: theme.accent1 }} />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology (B.Tech)</h3>
              <p className="text-lg font-semibold" style={{ color: theme.accent1 }}>
                Guru Gobind Singh Indraprastha University
              </p>
            </div>
            <div
              className="px-4 py-2 rounded-full text-slate-300 text-sm font-medium whitespace-nowrap"
              style={{ background: `${theme.accent1}12`, border: `1px solid ${theme.accent1}30` }}
            >
              Aug 2018 – Aug 2022
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
