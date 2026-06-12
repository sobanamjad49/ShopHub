import React, { useState } from 'react';
import ProductImage from './ProductImage';
import './ImageZoom.css';

const ImageZoom = ({ src, alt, className = '' }) => {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className={`image-zoom ${zoomed ? 'zoomed' : ''} ${className}`}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <ProductImage
        src={src}
        alt={alt}
        className="image-zoom-inner"
        imgClassName="image-zoom-img"
        imgStyle={
          zoomed
            ? {
                transformOrigin: `${position.x}% ${position.y}%`,
                transform: 'scale(2)',
              }
            : undefined
        }
      />
      <span className="image-zoom-hint">{zoomed ? '🔍 Zooming' : 'Hover to zoom'}</span>
    </div>
  );
};

export default ImageZoom;
