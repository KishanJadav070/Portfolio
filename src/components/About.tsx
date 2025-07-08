import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Brain, Rocket, Coffee, Send } from 'lucide-react';
import developerImage from '../image/card.jpg'; // Adjust path if needed

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  details: string;
  certificate: string | null;
}

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const features: Feature[] = [
    {
      icon: <Code2 className="w-6 h-6 text-primary-light" />,
      title: 'MERN Stack Developer',
      description: 'Skilled in React.js, Node.js, Express, and MongoDB.',
      details: 'Built full-stack apps like QuickRent with React.js and Node.js, integrating backend with MongoDB and Express.',
      certificate: null
    },
    {
      icon: <Brain className="w-6 h-6 text-secondary-light" />,
      title: 'AI Workshop Certified',
      description: 'Attended Google Cloud and Infosys AI programs.',
      details: 'Completed AI awareness workshops by Google Cloud and Infosys Springboard. Learned machine learning, ethics, and cloud deployment.',
      certificate: '/certificates/ai-workshop.pdf' // Place in /public/certificates/
    },
    {
      icon: <Rocket className="w-6 h-6 text-accent-light" />,
      title: 'Quick Learner & Innovator',
      description: 'Always exploring new tech to solve problems.',
      details: 'Recently learned Vite.js, Firebase, and OpenAI APIs. Passionate about innovation through rapid prototyping.',
      certificate: null
    },
    {
      icon: <Coffee className="w-6 h-6 text-success-light" />,
      title: 'Team Player & Leader',
      description: 'Project experience in QuickRent and TechXtreme.',
      details: 'Led frontend for QuickRent and coordinated TechXtreme DBMS events. Skilled in Git, teamwork, and project planning.',
      certificate: null
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; message: string }[]>([
    { role: 'bot', message: 'Hi there! I’m Kishan’s AI assistant. Ask me anything 👋' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, message: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userMessage)
      });

      const data = await response.json();
      const botReply = data.message || '✅ Message received!';
      setMessages(prev => [...prev, { role: 'bot', message: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', message: '❌ Server error. Try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="about" ref={ref} className="min-h-screen py-20 relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/50 to-background-light/30" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I’m Kishan Jadav, a passionate MERN Stack Developer who transforms ideas into user-centric digital solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300">
              I'm a full-stack developer with expertise in modern JavaScript frameworks. I build scalable apps that focus on both performance and user experience.
            </p>
            <p className="text-lg text-gray-300">
  • Passionate Fullstack Developer with hands-on experience in React.js, Node.js, MongoDB, Express, and Firebase, currently pursuing a degree in Information Technology. <br />
  • Successfully built real-world projects, focusing on responsive UI, user authentication, and real-time data integration. <br />
  •  A quick learner with strong problem-solving skills, constantly upgrading my tech stack and focused on building real-world solutions through innovative web applications.
</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedFeature(feature)}
                  className="p-4 rounded-xl bg-[#1e1e2f] border border-gray-700 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glow-wrapper relative w-full max-w-[450px] mx-auto aspect-[2/3] rounded-3xl">
              <div className="relative overflow-hidden rounded-3xl z-[1]">
                <img src={developerImage} alt="Kishan Jadav" className="w-full h-full object-cover rounded-3xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Modal */}
        {selectedFeature && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-[#1e1e2f] border border-gray-700 p-6 rounded-2xl w-[90%] max-w-lg text-white relative">
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-2 right-3 text-white text-2xl"
              >
                &times;
              </button>
              <div className="mb-3">{selectedFeature.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{selectedFeature.title}</h2>
              <p className="text-gray-300 mb-4">{selectedFeature.details}</p>
              {selectedFeature.certificate && (
                <a
                  href={selectedFeature.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  View Certificate
                </a>
              )}
            </div>
          </div>
        )}

        {/* Chatbot Section */}
        <div className="mt-20 max-w-3xl mx-auto p-6 rounded-2xl bg-[#121212] border border-gray-700 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Ask My AI Assistant 🤖</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto mb-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-700 text-gray-100'
                } w-fit`}
              >
                {msg.message}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700 text-gray-300 p-2 rounded-lg inline-block"
              >
                Typing...
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask something about Kishan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white outline-none border border-gray-600"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
              disabled={loading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Rainbow Glow Effect */}
      <style>{`
        .glow-wrapper::before {
          content: "";
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 24px;
          background: conic-gradient(red, orange, yellow, lime, cyan, blue, violet, red);
          background-size: 300% 300%;
          animation: rainbowGlow 8s linear infinite;
          filter: blur(6px);
          z-index: -1;
        }

        @keyframes rainbowGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default About;
