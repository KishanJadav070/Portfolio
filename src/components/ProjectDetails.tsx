import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "QuickRent Web App",
    role: "React.js Developer Intern at TechNishal",
    description: `QuickRent is a full-stack web application built using React.js and Firebase that allows users to rent, sell, and buy items online. It features a user-friendly interface, secure Firebase authentication, and real-time data updates.`,
    techStack: ["React.js", "Firebase", "Material UI", "CSS", "JavaScript"],
  },
  {
    title: "Doctor 24x7",
    role: "Project Idea",
    description: `An innovative virtual doctor-patient platform for global consultation. The platform includes video calling, availability status, patient reviews, and LinkedIn-style profiles for doctors.`,
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "Digital Art Gallery",
    role: "Ongoing Project",
    description: `A modern platform for artists and innovators to showcase and sell digital art and project source codes. Inspired by Shark Tank, this gallery connects developers and creators.`,
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
];

const ProjectDetails: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900" id="projects">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects & Experience
      </motion.h2>

      <div className="max-w-5xl mx-auto grid gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">{project.role}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectDetails;
 