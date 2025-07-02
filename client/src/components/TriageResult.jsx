import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';

function TriageResult({ result }) {
  if (!result) return null;

  const urgencyMatch = result.match(/Urgency Level: (Low|Medium|High)/i);
  const urgency = urgencyMatch ? urgencyMatch[1].toLowerCase() : 'low';

  const urgencyColor = {
    low: 'bg-green-100 text-green-700 border-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    high: 'bg-red-100 text-red-700 border-red-300',
  };

  const resultRef = useRef();

  const handleDownload = () => {
    if (resultRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: `triage_result_${new Date().getTime()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(resultRef.current)
        .save();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-xl mx-auto bg-white border border-gray-300 p-5 mt-6 rounded-lg shadow-md space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-700">AI Triage Result</h2>
        {urgency && (
          <span
            className={`px-3 py-1 text-sm rounded-full border font-medium ${urgencyColor[urgency]}`}
          >
            {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency
          </span>
        )}
      </div>

      <div ref={resultRef} className="text-gray-800 text-[16px] font-sans leading-relaxed space-y-2">
        <pre className="whitespace-pre-wrap">{result}</pre>
      </div>

      <button
        onClick={handleDownload}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>
    </motion.div>
  );
}

export default TriageResult;
