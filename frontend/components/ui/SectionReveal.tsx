'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './SectionReveal.module.css';

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  id,
  className = '',
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      initial="hidden"
      animate={controls}
      className={`${styles.reveal} ${className}`}
    >
      {children}
    </motion.section>
  );
}
