function HospitalInfo() {
  return (
    <section className="w-full py-16 px-6 bg-blue-100 dark:bg-slate-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400">
          🏥 Partner Hospital: MedLine Multispecialty
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Providing 24/7 emergency care, diagnostics, and specialty treatments. TriageIQ helps you decide when to reach us.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">📍 Address</h3>
            <p>123 Health Street, Hyderabad, Telangana - 500081</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">📞 Emergency</h3>
            <p>+91 99999 88888 (24/7 Ambulance & Doctor Support)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HospitalInfo;
