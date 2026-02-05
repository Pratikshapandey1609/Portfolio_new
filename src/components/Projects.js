import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
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

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const projects = [
    {
      title: 'AI Resume Parser',
      description: 'AI-powered resume parsing system that extracts and structures information from resumes with high accuracy, reducing manual processing time by 85%.',
      image: '/assets/img/Resume-logo.jpg',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      githubUrl: 'https://github.com/Pratikshapandey1609/Resume-Parssing',
      liveUrl: null,
    },
    {
      title: 'Expense Tracker',
      description: 'Personal finance management application with intuitive categorization, real-time balance updates, and insightful spending analytics.',
      image: '/assets/img/ExpenseTracker-logo.png',
      technologies: ['React', 'Spring Boot', 'MySQL', 'JWT'],
      githubUrl: 'https://github.com/Pratikshapandey1609/Expense-Tracker',
      liveUrl: null,
    },
    {
      title: 'Real-Time Chat App',
      description: 'WebSocket-based chat application with instant messaging, connection state management, and graceful failure recovery.',
      image: '/assets/img/real-time-chat.jpg',
      technologies: ['React', 'Java', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/Pratikshapandey1609/RealTime_ChatApp',
      liveUrl: null,
    },
    {
      title: 'AI Code Reviewer',
      description: 'Intelligent code analysis system that provides contextual suggestions for code improvements, vulnerability detection, and best practices.',
      image: '/assets/img/code-review.jpg',
      technologies: ['React', 'Spring Boot', 'MongoDB', 'Kubernetes'],
      githubUrl: 'https://github.com/Pratikshapandey1609/AI-CODE-REVIEW',
      liveUrl: null,
    },
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

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="py-20 lg:ml-70 relative">
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of my recent work
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              className="project-card card p-0 overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-deep-charcoal bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center text-deep-charcoal hover:bg-soft-cyan transition-colors duration-300"
                    >
                      <i className="fab fa-github text-lg" />
                    </motion.a>
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center text-deep-charcoal hover:bg-soft-cyan transition-colors duration-300"
                      >
                        <i className="fas fa-external-link-alt text-lg" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-electric-blue transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      className="tech-tag"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export defa