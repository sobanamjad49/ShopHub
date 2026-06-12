import React from 'react';
import { useEffect } from 'react';
import './ScrollProgressBar.css';

const ScrollProgressBar = () => {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress-bar" className="scroll-progress-bar" aria-hidden="true" />;
};

export default ScrollProgressBar;
