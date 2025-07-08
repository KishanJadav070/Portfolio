import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import mylogo from '../image/logo.jpg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/KishanJadav070' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/kishan-jadav-7b17382b6' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/kishanjadav' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full py-3 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.img
              src={mylogo}
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="text-white text-lg sm:text-xl font-bold tracking-wide hidden sm:block">
              Kishan Jadav
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={i}
                  onHoverStart={() => setHoveredLink(link.name)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition duration-300 font-medium"
                  >
                    {link.name}
                    {hoveredLink === link.name && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                  whileHover={{ scale: 1.1 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <button className="absolute top-5 right-5 text-white" onClick={toggleMenu}>
            <X size={28} />
          </button>
          <ul className="flex flex-col gap-6 text-center">
            {navLinks.map((link, i) => (
              <motion.li key={i} whileHover={{ scale: 1.05 }}>
                <a
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-white text-lg font-semibold"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="flex gap-6 mt-10">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
                whileHover={{ scale: 1.2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
