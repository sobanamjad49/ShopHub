import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './ProductQRCode.css';

const ProductQRCode = ({ productId, productName }) => {
  const canvasRef = useRef(null);
  const productUrl = `${window.location.origin}/products/${productId}`;

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `shophub-product-${productId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="product-qr-section">
      <h3>📱 Product QR Code</h3>
      <p className="qr-description">
        Scan to open <strong>{productName}</strong> directly on any device.
      </p>
      <div className="qr-code-wrapper" ref={canvasRef}>
        <QRCodeCanvas
          value={productUrl}
          size={160}
          level="M"
          includeMargin
          bgColor="#ffffff"
          fgColor="#1a1a2e"
        />
      </div>
      <p className="qr-url">{productUrl}</p>
      <button type="button" className="qr-download-btn" onClick={handleDownload}>
        Download QR Code
      </button>
    </div>
  );
};

export default ProductQRCode;
