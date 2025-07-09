import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import axios from 'axios';
import MagneticButton from './MagneticButton';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary-light" size={24} />,
      title: "Email",
      value: "jadavkishan070@gmail.com",
      link: "mailto:jadavkishan070@gmail.com"
    },
    {
      icon: <Phone className="text-primary-light" size={24} />,
      title: "Phone",
      value: "+91 8849700293",
      link: "tel:+91 8849700293"
    },
    {
      icon: <MapPin className="text-primary-light" size={24} />,
      title: "Location",
      value: "Gujarat, India",
      link: "https://maps.google.com/?q=Gujarat,India"
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: "GitHub",
      link: "https://github.com/KishanJadav070"
    },
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/kishan-jadav-7b17382b6"
    },
    {
      icon: <Twitter size={24} />,
      name: "Twitter",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 glow-text">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss your project or just say hello!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background-light/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-display font-bold mb-6">Send Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background-dark border border-gray-700 rounded-lg p-3 text-white focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                  placeholder="Your message..."
                />
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-dark text-white font-medium px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
                </button>
              </MagneticButton>

              {submitStatus === 'success' && (
                <p className="text-success-light text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-error-light text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block p-6 bg-background-light/50 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-primary-light/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                      <p className="text-gray-400">{info.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-background-light/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Connect with Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <MagneticButton key={index}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-background-dark rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
