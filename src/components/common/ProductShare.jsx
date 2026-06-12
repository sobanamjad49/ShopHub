import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import './ProductShare.css';

const ProductShare = ({ product }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/products/${product.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const shareLinks = [
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${product.name} - ${shareUrl}`)}`,
    },
  ];

  return (
    <div className="product-share glass-card">
      <h4>Share this product</h4>
      <div className="share-actions">
        <button type="button" className="share-btn primary" onClick={handleNativeShare}>
          📤 Share
        </button>
        <button type="button" className={`share-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ Copied!' : '🔗 Copy Link'}
        </button>
      </div>
      <div className="share-social">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="share-social-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductShare;
