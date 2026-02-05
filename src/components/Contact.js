import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import GeometricBackground from './GeometricBackground';
import { emailjsConfig } from '../config/emailjs';

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Check if EmailJS is configured
    if (emailjsConfig.serviceId === 'service_your_service_id' || 
        emailjsConfig.templateId === 'template_your_template_id' || 
        emailjsConfig.publicKey === 'your_public_key') {
      
      // EmailJS not configured yet - show message with contact info
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('not_configured');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
      return;
    }
    
    try {
      // Template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Message',
        message: formData.message,
        to_email: emailjsConfig.toEmail,
      };

      // Send email using EmailJS
      await emailjs.send(
        emailjsConfig.serviceId, 
        emailjsConfig.templateId, 
        templateParams, 
        emailjsConfig.publicKey
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Show success message for 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      // Show error message for 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: '+91 8120684746',
      link: 'https://wa.me/918120684746',
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
            Let's connect! Whether you're looking for a team member, project collaborator, or just want to chat about tech
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
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/pratikshaP920"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
              >
                <i className="fab fa-twitter text-lg" />
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
                  placeholder="Opportunity type, project details, or collaboration ideas"
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
                  placeholder="Tell me about the opportunity, project, or just say hello!"
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

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg text-green-400 text-center"
                >
                  <i className="fas fa-check-circle mr-2" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-center"
                >
                  <i className="fas fa-exclamation-circle mr-2" />
                  Failed to send message. Please try again or contact me directly.
                </motion.div>
              )}

              {submitStatus === 'not_configured' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg text-yellow-400 text-center"
                >
                  <i className="fas fa-info-circle mr-2" />
                  <div>
                    <p className="mb-2">Email service is being set up. Please contact me directly:</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                      <a href="mailto:pratishapandey239@gmail.com" className="hover:text-electric-blue transition-colors">
                        📧 pratishapandey239@gmail.com
                      </a>
                      <a href="https://wa.me/918120684746" className="hover:text-electric-blue transition-colors">
                        📱 WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;