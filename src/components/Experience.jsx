import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const experiences = [
  {
    company: 'Accenture',
    role: 'Data Engineer',
    period: 'Jan 2025 – Present',
    projects: [
      {
        name: 'Telstra Hopper',
        points: [
          'Designed and optimized 10+ ADF pipelines',
          'Improved ingestion efficiency by 25%',
          'Migrated ADF workflows to Databricks',
          'Reduced manual intervention by 30%',
          'Reduced transformation time by 20%',
        ],
      },
      {
        name: 'Kaiser Permanente',
        points: [
          'Built 15+ ETL pipelines using ADF',
          'Automated workflows using Python & PySpark',
          'Reduced production errors by 40%',
          'Improved reporting speed by 50%',
        ],
      },
    ],
  },
  {
    company: 'Tata Consultancy Services (TCS)',
    role: 'System Engineer',
    period: 'Dec 2021 – Jan 2025',
    projects: [
      {
        name: 'Core Operations',
        points: [
          'Built end-to-end ETL pipelines',
          'Integrated third-party systems using gRPC and HTTP/2',
          'Developed RESTful APIs',
          'Automated workflows saving 50+ hours/month',
        ],
      },
    ],
  },
];

const Experience = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section id="experience" className="py-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 flex items-center gap-4">
            Experience
            <div
              className="h-1 flex-1 rounded-full max-w-xs"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}80, transparent)` }}
            />
          </h2>
        </motion.div>

        <div
          className="relative border-l-2 pl-8 space-y-16"
          style={{ borderColor: `${theme.accent1}40` }}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="relative"
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[41px] top-2 w-5 h-5 rounded-full border-4 border-slate-900"
                style={{
                  background: theme.accent1,
                  boxShadow: `0 0 14px ${theme.accent1}`,
                }}
              />

              <div
                className="p-8 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: `1px solid ${theme.accent1}22`,
                  backdropFilter: 'blur(14px)',
                }}
              >
                {/* Left accent bar on hover */}
                <div
                  className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(180deg, ${theme.accent1}, ${theme.accent2})` }}
                />

                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-xl font-semibold" style={{ color: theme.accent1 }}>
                      {exp.company}
                    </div>
                  </div>
                  <div
                    className="px-4 py-1.5 rounded-full text-slate-300 text-sm whitespace-nowrap inline-flex items-center"
                    style={{ background: `${theme.accent1}12`, border: `1px solid ${theme.accent1}30` }}
                  >
                    {exp.period}
                  </div>
                </div>

                <div className="space-y-8">
                  {exp.projects.map((proj, pIdx) => (
                    <div key={pIdx}>
                      <h4
                        className="text-base font-semibold mb-3 flex items-center gap-2"
                        style={{ color: theme.accent2 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent2 }} />
                        Project: {proj.name}
                      </h4>
                      <ul className="space-y-2 pl-4">
                        {proj.points.map((point, ptIdx) => (
                          <li key={ptIdx} className="text-slate-300 text-[15px] flex items-start gap-2">
                            <span style={{ color: theme.accent1 }} className="mt-1">▹</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
