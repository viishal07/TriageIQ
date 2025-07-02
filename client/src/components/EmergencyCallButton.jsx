function EmergencyCallButton() {
  return (
    <a
      href="tel:+919999988888"
      className="fixed bottom-5 right-5 z-50 bg-red-600 text-white rounded-full p-4 shadow-lg animate-pulse hover:scale-105 transition"
      title="Emergency Call"
    >
      📞
    </a>
  );
}

export default EmergencyCallButton;
