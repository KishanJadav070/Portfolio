
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
// import Chatbot from './components/Chatbot';


function App() {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-x-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Resume />
          <Contact />
          {/* <Chatbot/> */}

          
        </main>
        
        <motion.footer 
          className="mt-20 py-6 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          © {new Date().getFullYear()} Kishan Jadav. All rights reserved.
        </motion.footer>
      </div>
    </div>
  );
}

export default App;