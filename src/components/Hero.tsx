import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, MessageSquare } from 'lucide-react';
import developerImage from '../image/hero1.png';
import axios from 'axios';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [role, setRole] = useState("recruiter");
  const [message, setMessage] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/messages`, { role, message });
alert("Message sent successfully!");
      setShowHireModal(false);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 bg-background-dark overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 z-0 w-[10%] h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-0%] w-[200%] h-[200%] rotate-[20deg] bg-gradient-to-br from-[#00ffe5aa] to-transparent opacity-30 blur-3xl z-0" />
      </div>

      {/* Scroll animation layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, opacity }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.4 }}
            className="text-left"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-4 text-white leading-tight z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              I'm a Developer
            </motion.h1>

            <motion.div
              className="text-xl sm:text-2xl lg:text-4xl font-medium mb-6 text-[#00ffe5] min-h-[60px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <TypeAnimation
                sequence={[
                  'Building Websites',
                  1000,
                  'Creating Solutions',
                  1000,
                  'Crafting Experiences',
                  1000,
                  'Innovating Technology',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
              />
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              Transforming ideas into elegant solutions through code. Let's build something extraordinary together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <motion.button
                onClick={() => setShowHireModal(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 15px 5px rgba(0, 255, 229, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-gradient-to-r from-[#00ffe5] to-[#00b4a8] text-black font-medium px-6 py-3 sm:px-8 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-cyan-400/30 hover:shadow-cyan-300/70 shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hire me
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute inset-0 rounded-full bg-cyan-300 blur-xl opacity-20 pointer-events-none"
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Developer Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto aspect-[3/4] overflow-hidden rounded-2xl shadow-xl z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark z-10" />
              <img
                src={developerImage}
                alt="Developer"
                className="w-full h-full object-cover sm:object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hire Me Modal */}
      {showHireModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHireModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background-light p-6 rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-display font-bold mb-4 text-[#00ffe5]">Let's Connect!</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">I am a</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white"
                >
                  <option value="recruiter">Recruiter</option>
                  <option value="hr">HR Professional</option>
                  <option value="manager">Hiring Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white h-32"
                  placeholder="Tell me about the opportunity..."
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowHireModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-[#00ffe5] to-[#00b4a8] px-6 py-2 rounded-lg flex items-center gap-2 text-black"
                >
                  Send Message
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
