import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      title: 'QuickRent - Rental/Sales Platform',
      description:
        'React + Firebase app for renting/selling items with real-time updates, cart functionality, filters, and AI-powered chatbot for admin panel.',
      image: 'https://images.pexels.com/photos/4391487/pexels-photo-4391487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React', 'Firebase', 'Node.js', 'Express', 'Chatbot AI'],
      liveUrl: 'https://quickrent-demo.web.app',
      githubUrl: 'https://github.com/kishanjadav/quickrent',
      category: 'Full Stack',
    },
    {
      title: 'Wear Web – E-Commerce Clothing App',
      description:
        'Full-stack MERN clothing store with user authentication, cart system, product catalog, and responsive UI/UX for smooth shopping experience.',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
      liveUrl: 'https://wearweb-demo.web.app',
      githubUrl: 'https://github.com/kishanjadav/wearweb',
      category: 'E-Commerce',
    },
    {
      title: 'Weather App',
      description:
        'Real-time weather update app using React and Axios. Fetches live weather data based on user’s location or input city name.',
      image: 'https://cdn.dribbble.com/userupload/18456569/file/original-7490c73afd13e8a2523fbe2c34f6853b.png?resize=400x0',
      technologies: ['React', 'Axios', 'OpenWeather API', 'CSS'],
      liveUrl: 'https://weatherapp-demo.web.app',
      githubUrl: 'https://github.com/kishanjadav/weather-app',
      category: 'Mini Project',
    },
  ];

  return (
    <section id="projects" ref={ref} className="min-h-screen py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 glow-text">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest works showcasing innovation and technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="group relative cursor-pointer perspective"
              onClick={() => setSelectedProject(project)}
            >
              <motion.div
                whileHover={{ scale: 1.03, rotateX: 2 }}
                className="bg-background-light border border-gray-800 rounded-xl overflow-hidden transition-shadow hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-light transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-background-dark text-gray-300 border border-gray-700 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-xs rounded-full bg-primary/20 border border-primary-light/30 text-primary-light">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: -10, y: 50 }}
              animate={{ scale: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-3xl w-full bg-background-light rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <p className="text-gray-300">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-background-dark border border-gray-700 text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <MagneticButton>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary-light hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
