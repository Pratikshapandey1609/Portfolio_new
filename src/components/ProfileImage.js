import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfileImage = ({ 
  size = 'w-20 h-20', 
  className = '', 
  showBorder = true,
  borderSize = 'border-3',
  animate = true 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('Profile image loaded successfully');
  };

  const handleImageError = (e) => {
    console.log('Profile image failed to load, trying fallback');
    setImageError(true);
    // Try fallback path
    if (e.target.src !== '/assets/img/passport-new.jpg') {
      e.target.src = '/assets/img/passport-new.jpg';
    }
  };

  const borderClass = showBorder ? `${borderSize} border-electric-blue` : '';
  const containerClass = `${size} rounded-full overflow-hidden ${borderClass} ${className}`;

  const ImageComponent = () => (
    <div className={containerClass}>
      {!imageLoaded && !imageError && (
        <div className="w-full h-full bg-electric-blue bg-opacity-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src="/passport-new.jpg"
        alt="Pratiksha Pandey"
        className={`profile-image w-full h-full transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      {imageError && imageLoaded && (
        <div className="w-full h-full bg-gradient-to-br from-electric-blue to-soft-cyan flex items-center justify-center">
          <span className="text-deep-charcoal font-bold text-lg">PP</span>
        </div>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <ImageComponent />
      </motion.div>
    );
  }

  return <ImageComponent />;
};

export default ProfileImage;