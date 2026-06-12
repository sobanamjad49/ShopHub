import React, { useState } from 'react';
import { FALLBACK_IMAGE } from '../../utils/config';
import './ProductImage.css';

const ProductImage = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  imgStyle,
  loading = 'lazy',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? FALLBACK_IMAGE : src;

  return (
    <div className={`product-image-wrapper ${className} ${loaded ? 'is-loaded' : ''}`}>
      {!loaded && <div className="product-image-shimmer" aria-hidden="true" />}
      <img
        src={imageSrc}
        alt={alt}
        className={`product-image-el ${imgClassName}`}
        style={imgStyle}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default ProductImage;
