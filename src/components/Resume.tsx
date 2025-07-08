import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, BookOpen, Briefcase, Award, ChevronRight, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Resume: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const education = [
    {
      degree: "Bachelor of Engineering in Information Technology",
      institution: "Gandhinagar Institute of Technology (GTU)",
      year: "2021 - 2025",
      description: "CGPA: 8.28. Studied core subjects like Data Structures, OOPs, OS, Networking, and Web Development."
    }
  ];

  const experience = [
    {
      position: "Web Developer Intern",
      company: "TechNishal, Ahmedabad",
      year: "Dec 2024 - May 2025",
      responsibilities: [
        "Worked on QuickRent platform using React.js and Firebase",
        "Integrated cart, product listing, dynamic filtering, and user authentication",
        "Developed real-time features and chatbot integration for admin panel"
      ],
      credential: "https://technishal.com/"
    },
    {
      position: "React.js Intern",
      company: "Infolabz IT Services Pvt. Ltd., Ahmedabad",
      year: "Jun 2024 - Jul 2024",
      responsibilities: [
        "Built responsive UI with React.js and Redux",
        "Integrated REST APIs and handled secure HTTP connections",
        "Collaborated in team development, code reviews, and performance optimization"
      ],
      credential: "https://infolabz.com/"
    }
  ];

  const skills = [
    { name: "React.js", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "Firebase", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "MongoDB", level: 80 },
    { name: "Git & GitHub", level: 90 },
    { name: "REST API", level: 85 }
  ];

  const handleDownload = () => {
    const toast = document.createElement('div');
    toast.textContent = "📄 Resume Download Started!";
    toast.className = "fixed top-6 right-6 bg-primary-light text-white px-4 py-2 rounded shadow-lg animate-bounce z-50";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <>
      <section id="resume" className="min-h-screen py-20 relative scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold mb-6 glow-text"
              whileHover={{ scale: 1.05 }}
            >
              Resume
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My journey in web development and key achievements
            </p>

            <MagneticButton>
              <motion.a
                href="https://drive.google.com/file/d/1-GVMewuzszjUeb68EvGHZJX2sl7dqnRM/view?usp=drivesdk"
                download
                onClick={handleDownload}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-primary-light to-primary rounded-full text-white hover:from-primary hover:to-primary-dark transition-all duration-300"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-primary-light" size={24} />
                <h3 className="text-2xl font-display font-bold">Education</h3>
              </div>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="p-6 rounded-lg bg-background-light/50 backdrop-blur-sm border border-gray-800 hover:scale-[1.02] transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-primary-light mb-2">{edu.degree}</h4>
                    <p className="text-gray-400 mb-2">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{edu.year}</p>
                    <p className="text-gray-300">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary-light" size={24} />
                <h3 className="text-2xl font-display font-bold">Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onClick={() => setSelectedExperience(exp)}
                    className="cursor-pointer p-6 rounded-lg bg-background-light/50 backdrop-blur-sm border border-gray-800 hover:scale-[1.03] hover:bg-background-light/70 transition-all duration-300 shadow-lg"
                  >
                    <h4 className="text-xl font-semibold text-primary-light mb-2">{exp.position}</h4>
                    <p className="text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.year}</p>
                    <p className="text-gray-300">Click to view details</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                className="bg-background-dark max-w-xl w-full rounded-xl shadow-lg p-6 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="absolute top-3 right-3 text-white hover:text-red-400" onClick={() => setSelectedExperience(null)}>
                  <X size={24} />
                </button>
                <h3 className="text-xl text-primary-light font-bold mb-2">{selectedExperience.position}</h3>
                <p className="text-gray-400 mb-1">{selectedExperience.company}</p>
                <p className="text-sm text-gray-500 mb-4">{selectedExperience.year}</p>
                <ul className="space-y-2 mb-4">
                  {selectedExperience.responsibilities.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <ChevronRight className="mt-1 text-primary-light" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={selectedExperience.credential} target="_blank" rel="noopener noreferrer" className="text-primary-light underline hover:text-primary">
                  View Credential
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="skills" className="py-20 bg-background-dark scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-primary-light" size={24} />
              <h3 className="text-2xl font-display font-bold">Skills</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-4 hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-200">{skill.name}</span>
                    <span className="text-primary-light">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-background-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-primary-light to-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Resume;
