import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const About = () => {
  const { theme } = useContext(ThemeContext);

  const stats = [
    { label: 'Experience',      value: '4+ Yrs',       color: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` },
    { label: 'Pipelines Built', value: '50+',          color: `linear-gradient(135deg, ${theme.accent2}, ${theme.accent1})` },
    { label: 'Domains',         value: 'Telecom & Health', color: `linear-gradient(135deg, #a78bfa, #818cf8)` },
    { label: 'Hours Saved',     value: '50+/mo',       color: `linear-gradient(135deg, #fb923c, #facc15)` },
  ];

  return (
    <section id="about" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 mb-4 flex items-center gap-4">
            About Me
            <div
              className="h-1 flex-1 rounded-full max-w-xs"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}80, transparent)` }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.6)',
              border: `1px solid ${theme.accent1}22`,
              backdropFilter: 'blur(16px)',
              boxShadow: `0 8px 40px ${theme.shadow1}`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
            />
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: theme.accent1 }} />

            <h3 className="text-2xl font-semibold mb-6" style={{ color: theme.accent1 }}>
              Professional Summary
            </h3>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
              <p>
                I am a dedicated <strong className="text-white">Data Engineer</strong> with over{' '}
                <strong style={{ color: theme.accent1 }}>4 years of experience</strong> architecting, developing,
                and optimizing highly scalable data pipelines.
              </p>
              <p>
                My expertise lies in designing robust ETL workflows with{' '}
                <strong className="text-white">Azure Data Factory (ADF)</strong>,{' '}
                <strong className="text-white">Databricks</strong>, and{' '}
                <strong className="text-white">Apache Spark</strong> — powered by Python and SQL.
              </p>
              <p>
                Having delivered enterprise-grade solutions across{' '}
                <strong style={{ color: theme.accent1 }}>Telecom</strong> and{' '}
                <strong style={{ color: theme.accent2 }}>Healthcare</strong>, I specialise in
                performance tuning, reducing operational overhead, and ensuring data integrity at scale.
              </p>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="p-6 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden cursor-default"
                style={{
                  background: 'rgba(15,23,42,0.5)',
                  border: `1px solid ${theme.accent1}22`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
                  style={{ background: stat.color }} />
                <div
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent mb-2"
                  style={{ backgroundImage: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
