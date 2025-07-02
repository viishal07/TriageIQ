function UrgencyBadge({ level }) {
  if (!level) return null;

  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const style = colors[level.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${style}`}>
      Urgency: {level}
    </span>
  );
}

export default UrgencyBadge;
