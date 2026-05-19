import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const skillsData = [
  { category: 'Core & Languages',      icon: '⚡', items: ['Python', 'SQL', 'Apache Spark', 'Hadoop'] },
  { category: 'Cloud & Data Tools',    icon: '☁️', items: ['Azure Data Factory', 'Databricks', 'AWS S3', 'AWS Lambda'] },
  { category: 'Databases & Protocols', icon: '🗄️', items: ['MySQL', 'REST APIs', 'gRPC', 'HTTP/2'] },
  { category: 'DevOps & Tools',        icon: '🛠️', items: ['Git', 'Jira', 'Confluence'] },
];

const domains = ['Telecom', 'Healthcare'];

const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section id="skills" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 inline-block relative pb-3">
            Technical Skills
            <div
              className="absolute -bottom-0 left-0 w-full h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
            />
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building scalable data infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl relative overflow-hidden group transition-all duration-300"
              style={{
                background: 'rgba(15,23,42,0.55)',
                border: `1px solid ${theme.accent1}22`,
                backdropFilter: 'blur(12px)',
                boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
              }}
            >
              {/* top accent */}
              <div
                className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
              />
              <div className="text-3xl mb-4">{group.icon}</div>
              <h3
                className="text-lg font-bold mb-5 transition-colors duration-300"
                style={{ color: 'rgba(226,232,240,0.9)' }}
                onMouseEnter={e => (e.currentTarget.style.color = theme.accent1)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(226,232,240,0.9)')}
              >
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: theme.accent1 }}
                    />
                    <span className="text-slate-300 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Domain badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-200 mb-6">Domain Expertise</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {domains.map((domain, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.06, y: -3 }}
                className="px-10 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all"
                style={{
                  background: `${theme.accent1}15`,
                  border: `1px solid ${theme.accent1}44`,
                  color: theme.accent1,
                  boxShadow: `0 4px 20px ${theme.shadow1}`,
                }}
              >
                {domain}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
