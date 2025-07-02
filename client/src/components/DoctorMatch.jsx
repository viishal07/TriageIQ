import { useEffect, useState } from 'react';
import { Stethoscope, Clock3, UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockSpecialties = [
  { specialty: 'General Physician', departments: ['fever', 'infection', 'pain'] },
  { specialty: 'ENT Specialist', departments: ['throat', 'ear', 'nose'] },
  { specialty: 'Dermatologist', departments: ['skin', 'rash', 'itching'] },
  { specialty: 'Cardiologist', departments: ['chest', 'heart', 'palpitation'] },
];

function getSpecialty(symptomText) {
  const text = symptomText.toLowerCase();
  for (const spec of mockSpecialties) {
    if (spec.departments.some(keyword => text.includes(keyword))) {
      return spec.specialty;
    }
  }
  return 'General Physician';
}

function DoctorMatch({ symptom }) {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (symptom) {
      const matchedSpecialty = getSpecialty(symptom);
      const crowdLevel = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
      const waitTime = Math.floor(Math.random() * 40) + 10;

      setSuggestion({
        doctor: matchedSpecialty,
        crowd: crowdLevel,
        wait: waitTime
      });
    }
  }, [symptom]);

  if (!symptom || !suggestion) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="doctor-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="max-w-xl mx-auto mt-10 p-5 bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" /> Suggested Doctor & Queue
        </h3>

        <div className="space-y-2 text-gray-700 dark:text-gray-100 text-sm">
          <div className="flex items-center gap-2">
            <UserRound className="w-4 h-4 text-blue-500" />
            <span>Specialist: <strong>{suggestion.doctor}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-orange-500" />
            <span>Estimated Wait Time: <strong>{suggestion.wait} min</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${
              suggestion.crowd === 'Low'
                ? 'bg-green-500'
                : suggestion.crowd === 'Medium'
                ? 'bg-yellow-400'
                : 'bg-red-500'
            }`}></span>
            <span>Current Crowd Level: <strong>{suggestion.crowd}</strong></span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DoctorMatch;
