import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WaveBackground from './WaveBackground';

const Services = () => {
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

    const element = document.getElementById('services');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const services = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Full-Stack Web Development',
      description: 'Complete web application development using modern technologies like React.js, Node.js, and Java Spring Boot.',
      features: [
        'Responsive Web Applications',
        'RESTful API Development',
        'Database Design & Integration',
        'Authentication & Security',
        'Performance Optimization'
      ],
      technologies: ['React.js', 'Node.js', 'Java', 'Spring Boot', 'MongoDB', 'MySQL'],
      complexity: 'Advanced',
      experience: '2+ Years'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Frontend Development',
      description: 'Modern, responsive, and interactive user interfaces that provide exceptional user experience.',
      features: [
        'React.js Applications',
        'Responsive Design',
        'Interactive UI Components',
        'Performance Optimization',
        'Cross-browser Compatibility'
      ],
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
      complexity: 'Intermediate',
      experience: '2+ Years'
    },
    {
      icon: 'fas fa-server',
      title: 'Backend Development',
      description: 'Robust and scalable backend solutions with secure APIs and efficient database management.',
      features: [
        'RESTful API Development',
        'Database Design',
        'Authentication Systems',
        'Server Configuration',
        'API Documentation'
      ],
      technologies: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
      complexity: 'Advanced',
      experience: '1+ Years'
    },
    {
      icon: 'fas fa-database',
      title: 'Database Solutions',
      description: 'Efficient database design, optimization, and management for your applications.',
      features: [
        'Database Design & Modeling',
        'Query Optimization',
        'Data Migration',
        'Backup & Recovery',
        'Performance Tuning'
      ],
      technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
      complexity: 'Intermediate',
      experience: '1+ Years'
    },
    {
      icon: 'fas fa-tools',
      title: 'DevOps & Deployment',
      description: 'Modern deployment practices and containerization for scalable applications.',
      features: [
        'Docker Containerization',
        'CI/CD Pipelines',
        'Cloud Deployment',
        'Monitoring & Logging',
        'Version Control'
      ],
      technologies: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'AWS', 'Heroku'],
      complexity: 'Learning',
      experience: '6+ Months'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Project Development',
      description: 'End-to-end project development from concept to deployment with modern practices.',
      features: [
        'Project Planning',
        'Agile Development',
        'Code Documentation',
        'Testing & Quality Assurance',
        'Deployment & Maintenance'
      ],
      technologies: ['Full Stack', 'Git', 'Testing Frameworks', 'Documentation Tools'],
      complexity: 'Advanced',
      experience: '2+ Years'
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

  const serviceVariants = {
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
    <section id="services" className="py-20 lg:ml-70 relative">
      <WaveBackground opacity={0.08} color="#8b5cf6" />
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            Areas of specialization and technical capabilities I bring to development projects
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
              ⚡ Clean Code
            </span>
            <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
              🔒 Best Practices
            </span>
            <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
              📱 Responsive Design
            </span>
            <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
              🚀 Modern Tech Stack
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={serviceVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group relative overflow-hidden"
            >
              {/* Service Icon */}
              <div className="w-16 h-16 bg-button-gradient rounded-2xl flex items-center justify-center text-deep-charcoal text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <i className={service.icon} />
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-bold text-text-primary mb-4 text-center group-hover:text-electric-blue transition-colors duration-300">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-text-secondary text-center mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3 text-center">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                      <i className="fas fa-check text-electric-blue flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-text-primary font-semibold mb-3 text-center">Technologies:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-electric-blue bg-opacity-10 text-electric-blue text-xs rounded-full border border-electric-blue border-opacity-30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience & Complexity */}
              <div className="border-t border-warm-slate pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <p className="text-text-tertiary text-xs mb-1">Complexity</p>
                    <p className="text-electric-blue font-bold text-sm">{service.complexity}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-tertiary text-xs mb-1">Experience</p>
                    <p className="text-text-primary font-semibold text-sm">{service.experience}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full btn-primary py-3 text-sm"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-electric-blue bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Interested in Collaboration?
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Whether you're looking for a team member, intern, or project collaborator, 
              I'm always excited to work on interesting challenges and learn from experienced developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary flex items-center justify-center gap-3 px-8 py-4"
              >
                <i className="fas fa-comments" />
                <span>Let's Connect</span>
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/918120684746"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-3 px-8 py-4"
              >
                <i className="fab fa-whatsapp" />
                <span>WhatsApp Me</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;