import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingDotsBackground from './FloatingDotsBackground';

const Achievements = () => {
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState('academic');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('achievements');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const achievements = {
    academic: [
      {
        title: 'B.Tech Computer Science Engineering',
        organization: 'Shri Ram Institute of Technology',
        date: '2022 - Present',
        description: 'Currently pursuing Bachelor of Technology with CGPA: 7.89/10',
        icon: 'fas fa-graduation-cap',
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'Higher Secondary Education',
        organization: 'Govt Girls Higher Secondary School',
        date: '2021 - 2022',
        description: 'Completed 12th grade with focus on Science and Mathematics',
        icon: 'fas fa-school',
        color: 'from-green-500 to-green-600'
      },
      {
        title: 'Secondary Education',
        organization: 'Govt Girls Higher Secondary School',
        date: '2019 - 2020',
        description: 'Completed 10th grade with strong foundation in core subjects',
        icon: 'fas fa-book',
        color: 'from-purple-500 to-purple-600'
      }
    ],
    technical: [
      {
        title: 'Full-Stack Web Development',
        organization: 'Self-Learning & Projects',
        date: '2023 - Present',
        description: 'Mastered MERN stack and Java Spring Boot development through hands-on projects',
        icon: 'fas fa-code',
        color: 'from-orange-500 to-orange-600'
      },
      {
        title: 'Java Programming Proficiency',
        organization: 'Academic & Professional Training',
        date: '2023 - Present',
        description: 'Advanced Java programming with Spring Boot framework expertise',
        icon: 'fab fa-java',
        color: 'from-red-500 to-red-600'
      },
      {
        title: 'React.js Development',
        organization: 'Project-Based Learning',
        date: '2023 - Present',
        description: 'Built multiple responsive web applications using React.js and modern JavaScript',
        icon: 'fab fa-react',
        color: 'from-cyan-500 to-cyan-600'
      },
      {
        title: 'Database Management',
        organization: 'Academic & Project Work',
        date: '2023 - Present',
        description: 'Experience with MongoDB, MySQL, and PostgreSQL database systems',
        icon: 'fas fa-database',
        color: 'from-indigo-500 to-indigo-600'
      }
    ],
    projects: [
      {
        title: 'AI Resume Parser System',
        organization: 'Personal Project',
        date: '2024',
        description: 'Built an intelligent resume parsing system with 85% accuracy using MERN stack',
        icon: 'fas fa-robot',
        color: 'from-pink-500 to-pink-600'
      },
      {
        title: 'Real-Time Chat Application',
        organization: 'Team Project',
        date: '2024',
        description: 'Developed scalable chat application with WebSocket integration and user management',
        icon: 'fas fa-comments',
        color: 'from-teal-500 to-teal-600'
      },
      {
        title: 'Expense Tracker Application',
        organization: 'Personal Project',
        date: '2024',
        description: 'Created comprehensive expense management system with analytics and reporting',
        icon: 'fas fa-chart-line',
        color: 'from-yellow-500 to-yellow-600'
      },
      {
        title: 'Portfolio Website',
        organization: 'Personal Branding',
        date: '2024',
        description: 'Designed and developed responsive portfolio with modern animations and interactions',
        icon: 'fas fa-globe',
        color: 'from-emerald-500 to-emerald-600'
      }
    ],
    extracurricular: [
      {
        title: 'GDSC Core Team Member',
        organization: 'Google Developer Student Clubs - SRIT',
        date: '2023 - Present',
        description: 'Organized developer events and workshops, boosting campus tech engagement',
        icon: 'fab fa-google',
        color: 'from-blue-500 to-blue-600'
      },
      {
        title: 'HackSRIT Participant',
        organization: 'College Hackathon',
        date: '2024',
        description: 'Developed innovative AI-based solution and collaborated with multidisciplinary team',
        icon: 'fas fa-trophy',
        color: 'from-gold-500 to-yellow-600'
      },
      {
        title: 'Microsoft Azure Hackathon Volunteer',
        organization: 'Microsoft Azure Hackathon 2025',
        date: '2025',
        description: 'Contributed as Frontend Developer, supporting participants and technical teams',
        icon: 'fab fa-microsoft',
        color: 'from-blue-600 to-blue-700'
      },
      {
        title: 'Open Source Contributor',
        organization: 'GitHub Community',
        date: '2023 - Present',
        description: 'Active contributor to open source projects and maintainer of personal repositories',
        icon: 'fab fa-github',
        color: 'from-gray-600 to-gray-700'
      }
    ]
  };

  const categories = [
    { key: 'academic', label: 'Academic', icon: 'fas fa-graduation-cap' },
    { key: 'technical', label: 'Technical', icon: 'fas fa-code' },
    { key: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
    { key: 'extracurricular', label: 'Activities', icon: 'fas fa-users' }
  ];

  const stats = [
    { number: '7.89', label: 'CGPA', icon: 'fas fa-star' },
    { number: '15+', label: 'Projects', icon: 'fas fa-code-branch' },
    { number: '3+', label: 'Tech Stacks', icon: 'fas fa-layer-group' },
    { number: '2+', label: 'Years Coding', icon: 'fas fa-calendar-alt' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="achievements" className="py-20 lg:ml-70 relative">
      <FloatingDotsBackground opacity={0.08} primaryColor="#8b5cf6" secondaryColor="#40e0d0" />
      <div className="absolute inset-0 bg-hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Achievements & Milestones</h2>
          <p className="section-subtitle">
            My journey of learning, building, and growing as a developer
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-rich-graphite rounded-xl border border-warm-slate hover:border-electric-blue transition-all duration-300"
            >
              <div className="w-12 h-12 bg-button-gradient rounded-full flex items-center justify-center text-deep-charcoal text-lg mx-auto mb-4">
                <i className={stat.icon} />
              </div>
              <h3 className="text-2xl font-bold text-electric-blue mb-2">{stat.number}</h3>
              <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.key
                  ? 'bg-electric-blue text-deep-charcoal shadow-glow'
                  : 'bg-warm-slate text-text-secondary hover:bg-electric-blue hover:bg-opacity-20 hover:text-electric-blue'
              }`}
            >
              <i className={category.icon} />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {achievements[activeCategory].map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card group relative overflow-hidden"
            >
              {/* Achievement Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br ${achievement.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={achievement.icon} />
              </div>

              {/* Achievement Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-electric-blue transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-electric-blue font-semibold text-sm">
                    {achievement.organization}
                  </p>
                  <p className="text-text-tertiary text-sm">
                    {achievement.date}
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {achievement.description}
                </p>
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
              Ready for New Challenges
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              I'm always eager to learn new technologies, take on challenging projects, 
              and contribute to meaningful work. Let's connect and explore opportunities together!
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
                <i className="fas fa-handshake" />
                <span>Let's Connect</span>
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/resume/PratikshaPandey_Resume (2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-3 px-8 py-4"
              >
                <i className="fas fa-download" />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;