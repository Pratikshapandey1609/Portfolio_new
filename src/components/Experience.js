import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingDotsBackground from './FloatingDotsBackground';

const Experience = () => {
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

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const experiences = [
    {
      title: 'MERN Stack Developer',
      company: 'Nura Care',
      period: 'September 2026 - Present',
      location: 'Remote',
      description: 'Working as a MERN Stack Developer on an intelligent Period & Menstrual Cycle Tracking platform, empowering women to monitor cycle health, log daily symptoms, and receive personalized cycle and ovulation predictions.',
      responsibilities: [
        'Developing responsive, user-friendly frontend interfaces in React.js for cycle tracking, symptom logging, and interactive calendar views',
        'Designing and building scalable RESTful APIs using Node.js and Express.js for cycle analytics and user health logs',
        'Architecting MongoDB schemas to securely manage and store sensitive health records, cycle history, and user preferences',
        'Implementing algorithms for cycle prediction, ovulation estimation, and fertile window forecasting based on historical cycle trends',
        'Integrating JWT authentication and robust privacy safeguards to protect confidential personal health data',
        'Collaborating in an agile environment, optimizing frontend state management, and ensuring seamless cross-device responsiveness'
      ],
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'JWT', 'REST APIs', 'Git'],
      type: 'internship'
    },
    {
      title: 'Full Stack Developer',
      company: 'Innovex Web Technology',
      period: 'August 2025 - Present',
      location: 'Remote',
      description: 'Working as a Full Stack Developer on a comprehensive Restaurant Management & Online Food Ordering platform, utilizing Spring Boot for backend development and React.js for interactive frontend interfaces.',
      responsibilities: [
        'Developing core features for a restaurant management system, including dynamic digital menus, real-time table reservations, and order processing',
        'Building responsive frontend interfaces with React.js and modern JavaScript for seamless diner and staff interactions',
        'Designing and implementing robust RESTful APIs with Spring Boot for order workflows, menu inventory, and payment integration',
        'Working with relational databases including MySQL and PostgreSQL for transaction records, menu catalogs, and customer data',
        'Implementing JWT-based authentication and role-based access control for administrators, restaurant staff, and diners',
        'Collaborating with cross-functional teams using Agile methodologies to deliver features iteratively',
        'Code review, testing, and maintaining high code quality and system reliability'
      ],
      technologies: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'PostgreSQL', 'JWT', 'Git', 'REST APIs'],
      type: 'internship'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const experienceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 lg:ml-70 relative">
      <FloatingDotsBackground opacity={0.2} primaryColor="#40e0d0" secondaryColor="#8b5cf6" />
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey and internship experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={experienceVariants}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-electric-blue opacity-30" />
              
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-electric-blue rounded-full border-4 border-deep-charcoal" />
              
              {/* Experience Card */}
              <div className="ml-16 mb-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card group"
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-electric-blue transition-colors duration-300">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-electric-blue font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-text-secondary font-medium">
                        {experience.period}
                      </p>
                      <p className="text-text-tertiary text-sm">
                        {experience.location}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="text-text-primary font-semibold mb-3">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.1 * idx }}
                          className="flex items-start gap-3 text-text-secondary"
                        >
                          <i className="fas fa-chevron-right text-electric-blue text-sm mt-1 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-text-primary font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.1 * techIndex }}
                          className="tech-tag"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-electric-blue bg-opacity-20 text-electric-blue text-xs font-semibold rounded-full border border-electric-blue border-opacity-30">
                      {experience.type.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;