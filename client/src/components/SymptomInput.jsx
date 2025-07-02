import { useEffect, useState, useRef } from 'react';
import TriageResult from './TriageResult';
import HistoryTimeline from './HistoryTimeline';
import { Sparkles } from 'lucide-react';
import SymptomAnalytics from './SymptomAnalytics';
import UrgencyChart from './UrgencyChart';
import DoctorMatch from './DoctorMatch';
import { motion, AnimatePresence } from 'framer-motion';

function SymptomInput({ autoDemo }) {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('triage-history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (autoDemo) {
      document.getElementById('analyzer-box')?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [autoDemo]);

  const handleSubmit = async () => {
    if (!symptom.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      console.log('📤 Sending symptom to backend:', symptom);

      const res = await fetch('http://triageiq-backend.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom }),
      });

      if (!res.ok) {
        console.error(`API error status: ${res.status}`);
        throw new Error(`API responded with ${res.status}`);
      }

      const data = await res.json();
      console.log('Response from backend:', data);

      if (!data.result) throw new Error('Empty response from backend');

      setResult(data.result);

      const newEntry = {
        symptom,
        result: data.result,
        date: new Date().toLocaleString(),
      };

      const updated = [newEntry, ...history];
      setHistory(updated);
      localStorage.setItem('triage-history', JSON.stringify(updated));
    } catch (error) {
      console.error('AI Error:', error);
      setResult('AI failed to generate a response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      <motion.div
        id="analyzer-box"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-2xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-blue-200 dark:border-slate-700 rounded-2xl shadow-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> AI Symptom Analyzer
        </h2>

        <label htmlFor="symptom-input" className="text-gray-700 dark:text-gray-200 text-lg">
          Describe your symptoms:
        </label>
        <textarea
          id="symptom-input"
          ref={inputRef}
          className="w-full border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="e.g. I have a sore throat and fever since last night..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white py-2.5 rounded-lg text-lg font-semibold shadow-md hover:scale-[1.02] transition-transform duration-200 ease-out"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze with AI'}
        </button>
      </motion.div>

      <TriageResult result={result} />
      <DoctorMatch symptom={symptom} />
      <SymptomAnalytics history={history} />
      <UrgencyChart history={history} />

      <div className="max-w-xl mx-auto mt-8">
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          {showHistory ? 'Hide History' : 'View Past History'}
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HistoryTimeline history={history} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SymptomInput;
