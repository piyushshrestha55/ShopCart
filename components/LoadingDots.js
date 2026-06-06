"use client";
import React from "react";
import { motion } from "motion/react";

const LoadingDots = () => {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-blue-600 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2, // stagger each dot
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
