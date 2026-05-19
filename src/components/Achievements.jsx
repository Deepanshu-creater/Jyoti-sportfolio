import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const rawData = [
  { name: 'Reduction in Production Errors', value: 40, staticColor: '#34d399' },
  { name: 'Faster Data Delivery',           value: 35, staticColor: '#60a5fa' },
  { name: 'Hours Saved Monthly',            value: 50, staticColor: '#a78bfa' },
  { name: 'ETL Pipelines Delivered',        value: 15, staticColor: '#f472b6' },
];

const Achievements = () => {
  const { theme } = useContext(ThemeContext);

  const data = rawData.map((d, i) => ({
    ...d,
    color: i === 0 ? theme.accent1 : i === 1 ? theme.accent2 : d.staticColor,
  }));

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] text-slate-100 inline-block relative pb-3">
            Key Achievements
            <div
              className="absolute -bottom-0 left-0 w-full h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})` }}
            />
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            Measurable impact delivered through automation and pipeline optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[380px] rounded-3xl p-6"
            style={{
              background: 'rgba(15,23,42,0.55)',
              border: `1px solid ${theme.accent1}22`,
              backdropFilter: 'blur(14px)',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={95}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15,23,42,0.95)',
                    borderColor: `${theme.accent1}44`,
                    borderRadius: '12px',
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-6 rounded-2xl flex flex-col justify-center border-l-4 relative overflow-hidden"
                style={{
                  background: 'rgba(15,23,42,0.55)',
                  backdropFilter: 'blur(12px)',
                  borderLeftColor: stat.color,
                  border: `1px solid ${stat.color}22`,
                  borderLeft: `4px solid ${stat.color}`,
                }}
              >
                <div className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
                  style={{ background: stat.color }} />
                <div className="text-4xl font-black mb-2" style={{ color: stat.color }}>
                  {stat.value}{stat.name.includes('Hours') || stat.name.includes('Pipelines') ? '+' : '%'}
                </div>
                <div className="text-slate-300 text-sm font-medium leading-snug">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
