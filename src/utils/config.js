export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const PRODUCTS_STORAGE_KEY = 'ecommerce_products';

export const FALLBACK_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#e8ecf4" width="400" height="300"/>
      <rect fill="#c5cee0" x="140" y="90" width="120" height="90" rx="8"/>
      <circle fill="#c5cee0" cx="175" cy="125" r="12"/>
      <path fill="#c5cee0" d="M140 165 L185 130 L220 155 L260 115 L260 180 L140 180 Z"/>
      <text x="200" y="220" text-anchor="middle" fill="#8896ab" font-family="sans-serif" font-size="14">Image unavailable</text>
    </svg>`
  );
