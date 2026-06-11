# ShopHub - Professional E-Commerce Frontend

A modern, fully responsive e-commerce website built with React featuring a professional design, local storage cart management, and comprehensive user features.

## 🎯 Features

### 🛍️ Core E-Commerce Features
- **Product Listing** - Browse products with category filtering and search functionality
- **Product Details** - View detailed information about each product with ratings and reviews
- **Shopping Cart** - Add/remove items with quantity management (Local Storage)
- **Checkout** - Seamless checkout flow with order summary
- **Order History** - Track all placed orders with detailed information
- **User Profile** - Manage personal information and addresses

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach with optimized layouts for all screen sizes
- **Burger Menu** - Mobile navigation with smooth animations
- **Sidebar** - Category filtering with active state indicators
- **Professional Layout** - Clean minimalist design with consistent color scheme
- **Header Navigation** - Sticky header with cart preview and quick access
- **Footer** - Comprehensive footer with links and information

### 📊 Admin Features
- **Admin Dashboard** - Overview of sales, revenue, and customer metrics
- **Sales Analytics** - Revenue graphs and order tracking
- **Recent Orders** - Quick view of latest transactions
- **Product Management** - Interface for managing inventory

### 💾 Data Persistence
- **Local Storage Cart** - Cart items persist across browser sessions
- **Order Storage** - All orders saved locally for history
- **User Profile** - Profile information persists in local storage

## 📁 Project Structure

```
src/
├── pages/ecommerce/
│   ├── Landing.jsx          # Homepage with hero section
│   ├── Products.jsx         # Product listing with filters
│   ├── ProductDetail.jsx    # Individual product page
│   ├── Cart.jsx             # Shopping cart display
│   ├── Checkout.jsx         # Order checkout form
│   ├── Profile.jsx          # User profile management
│   ├── OrderHistory.jsx     # Order tracking
│   └── AdminDashboard.jsx   # Admin analytics
├── components/common/
│   ├── Header.jsx           # Navigation header
│   ├── Sidebar.jsx          # Category filter
│   ├── ProductCard.jsx      # Product card component
│   └── Footer.jsx           # Footer component
├── context/
│   ├── ProductContext.jsx   # Product state management
│   ├── CartContext.jsx      # Cart state & local storage
│   └── AuthContext.jsx      # (Legacy)
├── data/
│   └── products.js          # Sample product database
└── App.jsx                  # Main routing
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📖 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section |
| `/products` | Product listing with filters |
| `/products/:id` | Individual product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout process |
| `/profile` | User profile |
| `/orders` | Order history |
| `/wishlist` | Saved wishlist items |
| `/admin` | Admin dashboard |

## 🎨 Design System

### Color Palette
- **Primary**: #333 (Dark Gray)
- **Secondary**: #667eea to #764ba2 (Gradient for admin)
- **Success**: #27ae60 (Green)
- **Danger**: #ff6b6b (Red)
- **Background**: #f5f5f5 (Light Gray)
- **Text**: #666 (Medium Gray)

### Typography
- Font Family: System fonts (-apple-system, Segoe UI, Roboto)
- Headings: 700 weight, 1.2 line-height
- Body: Regular weight, 1.6 line-height

### Spacing
- Based on 0.5rem units
- Consistent padding/margins: 1rem, 1.5rem, 2rem

## 💡 Key Components

### ProductCard
Displays individual products with:
- Product image
- Name and description
- Price and ratings
- Add to cart button
- Hover effects

### Header
- Logo and navigation links
- Search bar
- Cart button with item count
- Mobile burger menu

### Sidebar
- Category filters
- Price range selector
- Filter reset button
- Sticky positioning

### Cart Management
- Context-based state
- Local storage persistence
- Automatic calculations
- Quantity management

## 🛒 Cart & Checkout Flow

1. **Browse Products** → Add items to cart
2. **View Cart** → Review items and quantities
3. **Checkout** → Enter shipping and payment info
4. **Confirmation** → Order saved to local storage
5. **Order History** → Track all orders

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔒 Local Storage Schema

### Cart Items
```json
{
  "ecommerce_cart": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "image": "url",
      "category": "electronics"
    }
  ]
}
```

### Orders
```json
{
  "orders": [
    {
      "id": 1234567890,
      "date": "1/15/2025",
      "items": [],
      "total": "199.99",
      "customerInfo": {},
      "status": "Processing"
    }
  ]
}
```

### User Profile
```json
{
  "userProfile": {
    "firstName": "Soban",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

## 🎯 Sample Products

The app comes with 10 sample products across 3 categories:
- **Electronics** (4 products): Headphones, Smart Watch, Webcam, Power Bank
- **Accessories** (3 products): USB-C Cable, Phone Mount, Screen Protector
- **Office** (3 products): Laptop Stand, Mechanical Keyboard, Wireless Mouse

## 🔧 Customization

### Add New Products
Edit `src/data/products.js`:
```javascript
export const PRODUCTS = [
  {
    id: 11,
    name: 'Product Name',
    category: 'category',
    price: 99.99,
    image: 'url',
    description: 'Description',
    rating: 4.5,
    reviews: 100,
  }
];
```

### Change Colors
Update `src/index.css` and component CSS files:
```css
/* Primary color */
background-color: #333;

/* Update in Header.css, ProductCard.css, etc. */
```

### Adjust Responsive Breakpoints
Find `@media (max-width: 768px)` in CSS files and modify the pixel value.

## 📦 Dependencies

- **react** ^19.2.7
- **react-dom** ^19.2.7
- **react-router-dom** ^6.20.0
- **axios** ^1.6.0
- **react-scripts** 5.0.1

## 🚀 Performance Optimizations

- CSS Grid and Flexbox for efficient layouts
- CSS transitions for smooth animations
- LocalStorage for instant cart state
- Lazy loading placeholders
- Responsive image sizing

## 🔐 Security Notes

- No real payment processing (demo checkout)
- All data stored in local storage (browser only)
- Use HTTPS and secure backend in production
- Implement proper authentication for production

## 🐛 Known Limitations

- Checkout is demo only (no real payment)
- Products are static (no backend)
- Admin dashboard shows demo data
- No user authentication system
- Orders stored in local storage (not persistent across browsers)

## ❤️ Wishlist System
- Add / remove products from wishlist
- Wishlist counter in navbar
- Dedicated `/wishlist` page
- Persists in localStorage

## 🔍 Advanced Search & Filtering
- Live search
- Category filter
- Price range filter (min/max)
- Sorting (low to high, high to low, highest rated)
- Rating filter (3+, 4+, 4.5+)

## 📱 QR Code System
- Unique QR code per product on detail page
- Scan opens direct product URL
- Download QR code as PNG

## 🎨 Additional UI Features
- Quick View modal on product cards
- Image gallery slider on product detail
- Dark / light mode toggle in header

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment processing (Stripe/PayPal)
- [ ] User authentication system
- [ ] Product inventory management
- [ ] Product reviews and ratings (user-submitted)
- [ ] Email notifications
- [ ] Multiple language support

## 📧 Contact & Support

For questions or issues, please refer to the main project documentation.

---

**Created**: 2025  
**Framework**: React 19.2+  
**License**: MIT
