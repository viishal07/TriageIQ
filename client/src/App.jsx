import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './index.css';
import SymptomInput from './components/SymptomInput';
import { Typewriter } from 'react-simple-typewriter';
import LandingHero from './components/LandingHero';
import HospitalInfo from './components/HospitalInfo';
import EmergencyCallButton from './components/EmergencyCallButton';
import AppointmentBooking from './pages/AppointmentBooking';
import { AnimatePresence, motion } from 'framer-motion';
// 🎯 Wrapper to Animate Pages
function AnimatedRoutes({ demoStarted }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <LandingHero>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-600 drop-shadow-sm tracking-wide">
                  Triage<span className="text-green-600">IQ</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                  <Typewriter
                    words={[
                      'Your AI assistant for symptom triage.',
                      'Built to impress. Designed to care.',
                      'Built for health tech recruiters.',
                    ]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={1500}
                  />
                </p>
                <a
                  href="#analyzer"
                  className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-base font-medium shadow-md hover:bg-blue-700 transition"
                >
                  Start Analyzing
                </a>
              </LandingHero>

              <main id="analyzer" className="pt-12">
                <SymptomInput autoDemo={demoStarted} />
              </main>

              <HospitalInfo />
              <EmergencyCallButton />
            </motion.div>
          }
        />

        {/* 📅 Appointment Booking Page */}
        <Route
          path="/book"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <AppointmentBooking />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [demoStarted, setDemoStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDemoStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-800">
        {/* 🔝 Navigation Bar */}
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Triage<span className="text-green-500">IQ</span>
            </h1>
            <div className="space-x-2">
              <Link
                to="/"
                className="text-blue-600 font-medium px-4 py-1 hover:underline"
              >
                Home
              </Link>
              <Link
                to="/book"
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-200"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </nav>

        {/* ✨ Animated Pages */}
        <AnimatedRoutes demoStarted={demoStarted} />

       

        {/* 📌 Footer */}
        <footer className="w-full text-center text-sm text-white bg-blue-600 mt-16 py-6">
          © {new Date().getFullYear()} TriageIQ. Built with ❤️ for health tech.
        </footer>
      </div>
    </Router>
  );
}

export default App;
