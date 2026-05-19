import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

const projectsData = [
  {
    id: 1,
    title: 'Telstra Hopper',
    category: 'Telecom',
    stack: ['Azure Data Factory', 'Databricks', 'SQL'],
    description: 'Designed and optimized highly concurrent ADF pipelines. Migrated legacy workflows to Databricks, drastically reducing manual intervention.',
    metrics: ['25% faster ingestion', '30% less manual effort', '20% less transform time'],
  },
  {
    id: 2,
    title: 'Kaiser Permanente ETL',
    category: 'Healthcare',
    stack: ['Python', 'PySpark', 'ADF'],
    description: 'Developed automated ETL workflows to process and validate massive healthcare datasets with high accuracy and low latency.',
    metrics: ['40% fewer errors', '50% reporting speedup'],
  },
  {
    id: 3,
    title: 'Enterprise ETL Automation Platform',
    category: 'Platform',
    stack: ['Python', 'REST APIs', 'SQL'],
    description: 'Built a centralized orchestration system to monitor and auto-heal failing data pipelines across hybrid environments.',
    metrics: ['50+ hours saved/mo'],
  },
  {
    id: 4,
    title: 'Real-Time Data Reporting System',
    category: 'Platform',
    stack: ['gRPC', 'HTTP/2', 'Apache Spark'],
    description: 'Implemented high-efficiency third-party system integrations to deliver real-time metrics to executive dashboards.',
    metrics: ['Sub-second latency'],
  },
];

const categories = ['All', 'Telecom', 'Healthcare', 'Platform'];

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const [filter, setFilter] = useState('All');

  const filtered = projectsData.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 relative pb-3">
            Featured Projects
            <div
              className="absolute -bottom-0 left-0 w-full h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
            />
          </h2>

          {/* Filter pills */}
          <div
            className="flex gap-2 p-1 rounded-full overflow-x-auto"
            style={{ background: 'rgba(15,23,42,0.6)', border: `1px solid ${theme.accent1}22` }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
                style={
                  filter === cat
                    ? { background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`, color: '#fff' }
                    : { color: '#94a3b8' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl relative group overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: `1px solid ${theme.accent1}22`,
                  backdropFilter: 'blur(14px)',
                }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: `linear-gradient(135deg, ${theme.accent1}0a, ${theme.accent2}0a)` }}
                />
                <div
                  className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
                />

                <div className="relative z-10 flex flex-col h-full gap-6">
                  <h3
                    className="text-2xl font-bold text-white group-hover:transition-colors duration-300"
                    style={{ '--hover-color': theme.accent1 }}
                    onMouseEnter={e => (e.currentTarget.style.color = theme.accent1)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed flex-1">{project.description}</p>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md text-xs font-semibold"
                          style={{
                            background: `${theme.accent1}15`,
                            border: `1px solid ${theme.accent1}33`,
                            color: theme.accent1,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: `${theme.accent1}20` }}>
                    <div className="flex flex-wrap gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-lg" style={{ color: theme.accent2 }}>▲</span>
                          <span className="text-sm font-semibold text-slate-200">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
