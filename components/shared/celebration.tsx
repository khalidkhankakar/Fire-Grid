'use client';

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const Celebration: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // Get window dimensions for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Set dimensions initially
    window.addEventListener('resize', handleResize); // Update on resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle celebration trigger
  const handleCelebrate = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 6000); // Hide the message after 6 seconds
  };

  return (
    <div className="flex z-50 w-[100vw] bg-red-900 ">
      {/* Confetti */}
      {showMessage && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}

      <div
        style={{
          background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)'
        }}
        className='w-full z-50 flex items-center justify-center gap-x-3 py-0.5 px-3'>
        <p className="text-sm text-white ">🥳 Celebrate the success of Javascript Mastery 🎉</p>
        <button className='text-xs  text-white rounded-2xl  border px-3 border-white' onClick={handleCelebrate} >
          Celebrate
        </button>
      </div>

      {/* Animated Text */}
      {showMessage && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }} // Start small and transparent
          animate={{ scale: 1.5, opacity: 1 }} // Zoom out effect
          exit={{ scale: 0, opacity: 0 }} // Graceful exit
          transition={{ duration: 2, ease: 'easeOut' }} // Smooth zoom and fade
          className="z-50 font-bold text-lg md:text-xl lg:text-2xl text-orange-500 absolute top-[2%] right-[15%] md:right-[40%] "

        >
          🎉 Congraulations JSM 🥳
        </motion.div>
      )}
    </div>
  );
};

export default Celebration;
