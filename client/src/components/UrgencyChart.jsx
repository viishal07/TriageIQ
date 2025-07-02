import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#34D399', '#FBBF24', '#EF4444'];

function getUrgencyData(history) {
  const counts = { low: 0, medium: 0, high: 0 };

  history.forEach((entry) => {
    const match = entry.result.match(/Urgency Level: (Low|Medium|High)/i);
    if (match) {
      counts[match[1].toLowerCase()] += 1;
    }
  });

  return Object.entries(counts)
    .map(([urgency, value], i) => ({
      name: `${urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency`,
      value,
      color: COLORS[i]
    }))
    .filter((item) => item.value > 0);
}

function UrgencyChart({ history }) {
  const data = getUrgencyData(history);

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
        ⚠️ Urgency Distribution Overview
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            wrapperClassName="!text-sm"
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default UrgencyChart;
