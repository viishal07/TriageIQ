function HistoryTimeline({ history }) {
  if (!history.length) return null;

  return (
    <div className="animate-fade-in max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">🩺 Triage History</h2>
      <div className="space-y-6">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className="relative border-l-4 border-blue-500 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
          >
            <div className="absolute -left-3 top-5 w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
            <div className="text-xs text-gray-500 mb-2 italic">🕒 {entry.date}</div>
            <p className="text-base text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">Symptoms:</span> {entry.symptom}
            </p>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
              {entry.result}
            </p>
            <div className="mt-4 flex gap-2 text-xs text-gray-400">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Session #{history.length - idx}</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded-full">Saved</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryTimeline;
