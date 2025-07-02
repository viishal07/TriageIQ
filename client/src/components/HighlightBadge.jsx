function HighlightBadge({ text, type }) {
  const typeColors = {
    cause: 'bg-purple-100 text-purple-800 border-purple-300',
    next: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    default: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  const badgeStyle = typeColors[type] || typeColors.default;

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${badgeStyle} animate-fade-in`}>
      {text}
    </span>
  );
}

export default HighlightBadge;
