import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: 'fab fa-linkedin',
      href: 'https://www.linkedin.com/in/pratiksha-pandey-147770276/',
      label: 'LinkedIn',
    },
    {
      icon: 'fab fa-github',
      href: 'https://github.com/Pratikshapandey1609',
      label: 'GitHub',
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="py-12 lg:ml-70 relative border-t border-warm-slate">
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Pratiksha Pandey
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Full-Stack Developer passionate about creating impactful digital solutions 
              with modern technologies and clean code.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-electric-blue transition-colors duration-300 font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold text-text-primary mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300 shadow-lg hover:shadow-glow"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-lg`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-8 border-t border-warm-slate text-center"
        >
          <p className="text-text-tertiary">
            &copy; {currentYear} Pratiksha Pandey. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;