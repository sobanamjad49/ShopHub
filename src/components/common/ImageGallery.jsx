import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductImage from './ProductImage';
import './ImageGallery.css';

const ImageGallery = ({ images, alt, badge }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = images?.length ? images : [];

  if (!galleryImages.length) return null;

  const goTo = (index) => {
    setActiveIndex((index + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="gallery-main-image"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ProductImage
              src={galleryImages[activeIndex]}
              alt={`${alt} - view ${activeIndex + 1}`}
              className="gallery-image-wrapper"
              imgClassName="gallery-image"
            />
          </motion.div>
        </AnimatePresence>

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-nav gallery-nav-prev"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-nav gallery-nav-next"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gallery-dots">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gallery-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {badge && <span className="gallery-badge">{badge}</span>}
      </div>

      {galleryImages.length > 1 && (
        <div className="gallery-thumbnails">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`gallery-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <ProductImage src={src} alt={`${alt} thumbnail ${i + 1}`} className="gallery-thumb-img" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
