import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GeometricBackground from './GeometricBackground';

const Contact = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  const contactMethods = [
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 8120684746',
      link: 'tel:+918120684746',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'pratishapandey239@gmail.com',
      link: 'mailto:pratishapandey239@gmail.com',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Jabalpur, India',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 lg:ml-70 relative">
      <GeometricBackground opacity={0.06} color="#40e0d0" />
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-rich-graphite rounded-lg border border-warm-slate hover:border-electric-blue transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-electric-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                    <i className={`${method.icon} text-electric-blue text-lg`} />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">{method.title}</h4>
                    {method.link ? (
                      <a
                        href={method.link}
                        className="text-text-secondary hover:text-electric-blue transition-colors duration-300"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-text-secondary">{method.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/pratiksha-pandey-147770276/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
              >
                <i className="fab fa-linkedin text-lg" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Pratikshapandey1609"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
              >
                <i className="fab fa-github text-lg" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-warm-slate border border-warm-slate rounded-lg text-text-primary placeholder-text-tertiary focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-warm-slate border border-warm-slate rounded-lg text-text-primary placeholder-text-tertiary focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-warm-slate border border-warm-slate rounded-lg text-text-primary placeholder-text-tertiary focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-20 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-warm-slate border border-warm-slate rounded-lg text-text-primary placeholder-text-tertiary focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-deep-charcoal border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;