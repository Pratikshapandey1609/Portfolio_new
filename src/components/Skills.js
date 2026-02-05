import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
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

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Core Java', icon: 'J', color: 'from-orange-500 to-orange-600' },
        { name: 'JavaScript', icon: '/assets/img/javascript.png', isImage: true },
        { name: 'Python', icon: '/assets/img/python.jpg', isImage: true },
        { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-600' },
      ]
    },
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', icon: '/assets/img/react-logo.jpg', isImage: true },
        { name: 'HTML5', icon: '/assets/img/html5.png', isImage: true },
        { name: 'CSS3', icon: '/assets/img/css3.png', isImage: true },
        { name: 'Tailwind CSS', icon: '/assets/img/taildwind-logo.jpg', isImage: true },
        { name: 'Material UI', icon: '/assets/img/materialui-logo.jpg', isImage: true },
        { name: 'Redux', icon: 'RX', color: 'from-purple-500 to-purple-600' },
        { name: 'Zustand', icon: 'Z', color: 'from-orange-500 to-orange-600' },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Spring Boot', icon: 'SB', color: 'from-green-500 to-green-600' },
        { name: 'Node.js', icon: '/assets/img/nodejs.png', isImage: true },
        { name: 'Express.js', icon: 'EX', color: 'from-gray-700 to-gray-800' },
        { name: 'Redis', icon: 'R', color: 'from-red-500 to-red-600' },
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', icon: 'M', color: 'from-green-600 to-green-700' },
        { name: 'MySQL', icon: '/assets/img/mysql-logo-1.png', isImage: true },
        { name: 'PostgreSQL', icon: '/assets/img/postgresql.png', isImage: true },
      ]
    },
    {
      title: 'Security & Authentication',
      skills: [
        { name: 'JWT', icon: 'JWT', color: 'from-gray-800 to-gray-900' },
        { name: 'Zod', icon: 'Z', color: 'from-blue-600 to-blue-700' },
        { name: 'Passport.js', icon: '/assets/img/passport-new.jpg', isImage: true },
        { name: 'bcrypt', icon: '/assets/img/bcrypt-logo.jpg', isImage: true },
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', icon: 'D', color: 'from-blue-500 to-blue-600' },
        { name: 'Kubernetes', icon: 'K8s', color: 'from-blue-600 to-blue-700' },
        { name: 'Git', icon: '/assets/img/git.png', isImage: true },
        { name: 'GitHub', icon: '/assets/img/github.png', isImage: true },
        { name: 'Postman', icon: 'P', color: 'from-orange-600 to-red-600' },
      ]
    },
    {
      title: 'Cloud & Analytics',
      skills: [
        { name: 'AWS', icon: '/assets/img/aws.png', isImage: true },
        { name: 'Heroku', icon: '/assets/img/heroku.png', isImage: true },
        { name: 'Power BI', icon: 'BI', color: 'from-yellow-500 to-yellow-600' },
      ]
    },
    {
      title: 'Data Science & AI',
      skills: [
        { name: 'TensorFlow', icon: '/assets/img/tensorflow-logo-1.png', isImage: true },
        { name: 'Keras', icon: '/assets/img/keras-logo.png', isImage: true },
        { name: 'PyTorch', icon: '/assets/img/pytorch-logo.png', isImage: true },
        { name: 'Pandas', icon: '/assets/img/pandas-logo-1.png', isImage: true },
        { name: 'Matplotlib', icon: '/assets/img/matplotlib-logo-1.svg', isImage: true },
      ]
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

  const categoryVariants = {
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="py-20 lg:ml-70 relative">
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="card text-center group"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4 relative">
                {category.title}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-button-gradient rounded-full" />
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="skill-ite