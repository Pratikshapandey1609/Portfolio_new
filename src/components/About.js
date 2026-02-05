import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GeometricBackground from './GeometricBackground';

const About = () => {
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    { number: '10+', label: 'Projects' },
    { number: '2+', label: 'Years Experience' },
    { number: 'Java+React', label: 'Tech Focus' },
  ];

  return (
    <section id="about" className="py-20 lg:ml-70 relative">
      <GeometricBackground opacity={0.08} color="#8b5cf6" />
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Dedicated Computer Science student with expertise in full-stack development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              I'm a Computer Science student at Shri Ram Institute of Technology, specializing in full-stack development 
              with expertise in Java, Spring Boot, React, and modern web technologies. I focus on building scalable, 
              secure applications using both MERN stack and enterprise Java solutions.
            </p>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              Currently expanding my skills in DevOps technologies like Docker and Kubernetes while maintaining a strong 
              foundation in database management with MongoDB, MySQL, and PostgreSQL, along with API development and testing using Postman.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
                Team Player
              </span>
              <span className="px-4 py-2 bg-electric-blue bg-opacity-10 text-electric-blue rounded-full text-sm font-medium border border-electric-blue border-opacity-30">
                Quick Learner
              </span>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-rich-graphite rounded-xl border border-warm-slate hover:border-electric-blue transition-all duration-300"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="text-3xl font-bold text-electric-blue mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-text-secondary font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;