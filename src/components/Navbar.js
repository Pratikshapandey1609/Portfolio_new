import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileImage from './ProfileImage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navItems = useMemo(() => [
    { id: 'hero', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-cogs' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-code' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
    { id: 'resume', label: 'Resume', icon: 'fas fa-file-alt' },
  ], []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Hover-based Navigation */}
      <div className="hidden lg:block">
        {/* Hover Trigger Area - Wider for better UX */}
        <motion.div
          className="fixed left-0 top-0 w-8 h-full z-50 bg-transparent"
          onMouseEnter={handleMouseEnter}
        />
        
        {/* Navigation Hint */}
        <AnimatePresence>
          {!isHovering && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 pointer-events-none"
            >
              <div className="bg-electric-blue text-deep-charcoal px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <i className="fas fa-chevron-right mr-2" />
                Hover to navigate
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Navigation */}
        <motion.nav
          initial={{ x: -280 }}
          animate={{ x: isHovering ? 0 : -240 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 200,
            duration: 0.4 
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed left-0 top-0 h-full w-70 bg-deep-charcoal bg-opacity-95 backdrop-blur-xl border-r border-warm-slate z-40 flex flex-col shadow-2xl"
        >
          {/* Visible Tab */}
          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
            <div className="bg-electric-blue text-deep-charcoal p-3 rounded-r-lg shadow-lg">
              <motion.i
                className="fas fa-bars text-lg"
                animate={{ rotate: isHovering ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isHovering ? 1 : 0.7, 
              y: 0,
              scale: isHovering ? 1 : 0.9
            }}
            transition={{ duration: 0.3, delay: isHovering ? 0.1 : 0 }}
            className="p-8 border-b border-warm-slate bg-electric-blue bg-opacity-5"
          >
            <ProfileImage 
              size="w-20 h-20"
              className="mx-auto mb-4"
              animate={true}
            />
            
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-text-primary text-center mb-2">
                    Pratiksha
                  </h2>
                  <p className="text-sm text-electric-blue text-center font-medium">
                    Full-Stack Developer
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Menu */}
          <div className="flex-1 py-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isHovering ? 1 : 0.95
                }}
                transition={{ 
                  delay: isHovering ? index * 0.05 : 0,
                  duration: 0.3
                }}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item w-full flex items-center gap-4 px-8 py-4 text-left transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? 'text-text-primary bg-electric-blue bg-opacity-10 border-r-4 border-electric-blue'
                    : 'text-text-secondary hover:text-text-primary hover:bg-electric-blue hover:bg-opacity-5'
                }`}
              >
                {/* Icon */}
                <motion.i 
                  className={`${item.icon} text-lg ${
                    activeSection === item.id ? 'text-electric-blue' : 'text-text-secondary group-hover:text-electric-blue'
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Label */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-electric-blue"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-electric-blue"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovering ? 1 : 0.7, 
              y: 0,
              scale: isHovering ? 1 : 0.9
            }}
            transition={{ duration: 0.3, delay: isHovering ? 0.2 : 0 }}
            className="p-8 border-t border-warm-slate"
          >
            <div className="flex justify-center gap-4">
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
            </div>
          </motion.div>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 w-12 h-12 rounded-xl z-50 lg:hidden flex items-center justify-center transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-glass border border-warm-slate' : 'bg-deep-charcoal bg-opacity-90'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-text-primary text-lg`} />
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-deep-charcoal bg-opacity-95 backdrop-blur-xl border-r border-warm-slate z-50 lg:hidden flex flex-col"
            >
              {/* Mobile Profile Section */}
              <div className="p-6 border-b border-warm-slate bg-electric-blue bg-opacity-5 mt-16">
                <ProfileImage 
                  size="w-16 h-16"
                  className="mx-auto mb-3"
                  borderSize="border-2"
                  animate={false}
                />
                <h2 className="text-lg font-bold text-text-primary text-center mb-1">
                  Pratiksha Pandey
                </h2>
                <p className="text-sm text-electric-blue text-center">
                  Full-Stack Developer
                </p>
              </div>

              {/* Mobile Navigation Menu */}
              <div className="flex-1 py-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-text-primary bg-electric-blue bg-opacity-10 border-r-4 border-electric-blue'
                        : 'text-text-secondary hover:text-text-primary hover:bg-electric-blue hover:bg-opacity-5'
                    }`}
                  >
                    <i className={`${item.icon} text-lg ${
                      activeSection === item.id ? 'text-electric-blue' : 'text-text-secondary'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="p-6 border-t border-warm-slate">
                <div className="flex justify-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/pratiksha-pandey-147770276/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
                  >
                    <i className="fab fa-linkedin" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Pratikshapandey1609"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-warm-slate rounded-full flex items-center justify-center text-text-secondary hover:bg-electric-blue hover:text-deep-charcoal transition-all duration-300"
                  >
                    <i className="fab fa-github" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;