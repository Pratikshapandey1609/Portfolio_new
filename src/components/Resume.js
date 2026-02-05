import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Resume = () => {
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

    const element = document.getElementById('resume');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const [showPreview, setShowPreview] = useState(false);

  const highlights = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education',
      subtitle: 'B.Tech Computer Science',
      detail: 'CGPA: 7.89/10',
    },
    {
      icon: 'fas fa-code',
      title: 'Specialization',
      subtitle: 'Full-Stack Development',
      detail: 'Java • React • Spring Boot',
    },
    {
      icon: 'fas fa-project-diagram',
      title: 'Projects',
      subtitle: '10+ Completed Projects',
      detail: 'AI • Web Apps • APIs',
    },
    {
      icon: 'fas fa-tools',
      title: 'Tech Stack',
      subtitle: 'Modern Technologies',
      detail: 'MERN • Java • DevOps',
    },
    {
      icon: 'fas fa-database',
      title: 'Databases',
      subtitle: 'Multi-Database Experience',
      detail: 'MongoDB • MySQL • PostgreSQL',
    },
    {
      icon: 'fas fa-cloud',
      title: 'DevOps & Cloud',
      subtitle: 'Modern Deployment',
      detail: 'Docker • Kubernetes • AWS',
    },
  ];

  const previewContent = {
    summary: "Computer Science student and full-stack developer with expertise in Java, Spring Boot, React, and modern web technologies. Passionate about building scalable, secure applications and solving complex problems through elegant code architecture.",
    technologies: {
      backend: ["Java, Spring Boot", "Node.js, Express.js", "JWT Authentication"],
      frontend: ["React.js, JavaScript", "HTML5, CSS3", "Responsive Design"],
      databases: ["MongoDB, MySQL, PostgreSQL", "Docker, Kubernetes", "AWS, Git, GitHub"]
    },
    projects: [
      {
        title: "AI Resume Parser",
        description: "Intelligent document processing system with 85% accuracy improvement",
        tech: "React • Node.js • MongoDB • AI/ML"
      },
      {
        title: "Real-Time Chat Application",
        description: "Scalable messaging platform with WebSocket integration",
        tech: "React • Java • PostgreSQL • Docker"
      },
      {
        title: "Expense Tracker",
        description: "Personal finance management with analytics dashboard",
        tech: "React • Spring Boot • MySQL • JWT"
      }
    ],
    education: {
      degree: "B.Tech Computer Science Engineering",
      institution: "Shri Ram Institute of Technology, Jabalpur",
      grade: "CGPA: 7.89/10"
    }
  };

  return (
    <section id="resume" className="py-20 lg:ml-70 relative">
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Download my resume to learn more about my experience and qualifications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-button-gradient rounded-2xl flex items-center justify-center text-deep-charcoal text-3xl shadow-glow">
                <i className="fas fa-file-pdf" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Pratiksha Pandey - Software Developer
                </h3>
                <p className="text-lg text-electric-blue mb-3 font-medium">
                  Full-Stack Engineer | MERN Stack Specialist
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-electric-blue" />
                    Last updated: December 2024
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-file-alt text-electric-blue" />
                    PDF Format
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-download text-electric-blue" />
                    Ready to Download
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Pratikshapandey1609/RESUME/blob/main/PratikshaPandey_Resume%20(2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-3 px-8 py-4"
              >
                <i className="fas fa-download" />
                <span>Download Resume</span>
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPreview(true)}
                className="btn-secondary flex items-center justify-center gap-3 px-8 py-4"
              >
                <i className="fas fa-eye" />
                <span>Quick Preview</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Resume Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-2xl font-bold text-text-primary text-center mb-8 relative">
              Resume Highlights
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-button-gradient rounded-full" />
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-warm-slate rounded-xl border-2 border-transparent hover:border-electric-blue transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-button-gradient rounded-full flex items-center justify-center text-deep-charcoal text-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <i className={highlight.icon} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-text-secondary mb-2">{highlight.subtitle}</p>
                  <span className="text-sm text-electric-blue font-medium">
                    {highlight.detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-rich-graphite border border-warm-slate rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-warm-slate bg-electric-blue bg-opacity-5">
                <h3 className="text-2xl font-bold text-text-primary">Resume Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-10 h-10 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                {/* Professional Summary */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-user text-electric-blue" />
                    Professional Summary
                  </h4>
                  <p className="text-text-secondary leading-relaxed">{previewContent.summary}</p>
                </div>

                {/* Core Technologies */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-code text-electric-blue" />
                    Core Technologies
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-electric-blue mb-2">Backend</h5>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {previewContent.technologies.backend.map((tech, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-electric-blue rounded-full" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-electric-blue mb-2">Frontend</h5>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {previewContent.technologies.frontend.map((tech, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-electric-blue rounded-full" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-electric-blue mb-2">Database & DevOps</h5>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {previewContent.technologies.databases.map((tech, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-electric-blue rounded-full" />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-project-diagram text-electric-blue" />
                    Featured Projects
                  </h4>
                  <div className="space-y-4">
                    {previewContent.projects.map((project, index) => (
                      <div key={index} className="p-4 bg-warm-slate rounded-lg border-l-4 border-electric-blue">
                        <h5 className="font-semibold text-text-primary mb-2">{project.title}</h5>
                        <p className="text-sm text-text-secondary mb-2">{project.description}</p>
                        <span className="text-xs text-electric-blue font-medium">{project.tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-text-primary flex items-center gap-3">
                    <i className="fas fa-graduation-cap text-electric-blue" />
                    Education & Achievements
                  </h4>
                  <div className="p-4 bg-warm-slate rounded-lg">
                    <h5 className="font-semibold text-text-primary mb-1">{previewContent.education.degree}</h5>
                    <p className="text-sm text-text-secondary mb-2">{previewContent.education.institution}</p>
                    <span className="text-sm text-electric-blue font-medium">{previewContent.education.grade}</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 p-6 border-t border-warm-slate bg-electric-blue bg-opacity-5">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/Pratikshapandey1609/RESUME/blob/main/PratikshaPandey_Resume%20(2).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-3 flex-1 justify-center"
                >
                  <i className="fas fa-download" />
                  <span>Download PDF Resume</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/Pratikshapandey1609/RESUME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-3 flex-1 justify-center"
                >
                  <i className="fab fa-github" />
                  <span>View on GitHub</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;