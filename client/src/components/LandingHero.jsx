import { motion } from 'framer-motion';

function LandingHero({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center py-20 px-6 bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-sm rounded-b-3xl"
    >
      <div className="max-w-3xl mx-auto space-y-4">{children}</div>
    </motion.section>
  );
}

export default LandingHero;
