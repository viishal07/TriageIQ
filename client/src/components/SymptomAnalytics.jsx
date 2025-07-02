import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { motion } from 'framer-motion';

function SymptomAnalytics({ history }) {
  const data = useMemo(() => {
    const freq = {};
    history.forEach((entry) => {
      const words = entry.symptom.toLowerCase().split(/\W+/);
      words.forEach((word) => {
        if (word.length > 3) {
          freq[word] = (freq[word] || 0) + 1;
        }
      });
    });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return sorted.map(([symptom, count]) => ({ symptom, count }));
  }, [history]);

  if (data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-3xl mx-auto mt-16 p-6 bg-white/70 dark:bg-slate-800/60 border border-blue-200 dark:border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl"
    >
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6 tracking-tight">
        📊 Symptom Frequency Analytics
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis type="number" axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="symptom"
            tick={{ fontSize: 14, fill: '#4B5563' }}
            width={120}
          />
          <Tooltip
            wrapperClassName="!text-sm"
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px' }}
          />
          <Bar dataKey="count" fill="#3B82F6" radius={[10, 10, 10, 10]}>
            <LabelList
              dataKey="count"
              position="right"
              style={{ fill: '#1E3A8A', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default SymptomAnalytics;
