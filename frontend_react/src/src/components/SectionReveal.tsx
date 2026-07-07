import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}
export function SectionReveal({
  children,
  id,
  className = '',
  delay = 0
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
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
          y: 50
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98]
          }
        }
      }}
      initial="hidden"
      animate={controls}
      className={className}>
      
      {children}
    </motion.section>);

}