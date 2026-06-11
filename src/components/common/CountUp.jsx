import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CountUp = ({ value, prefix = '', suffix = '', decimals = 0, duration = 1.5 }) => {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { duration: duration * 1000 });

  useEffect(() => {
    spring.set(value);
    const unsub = spring.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [value, spring]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <motion.span>
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};

export default CountUp;
