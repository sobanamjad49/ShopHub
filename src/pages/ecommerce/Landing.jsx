import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/common/ProductCard';
import ProductImage from '../../components/common/ProductImage';
import ScrollReveal from '../../components/common/ScrollReveal';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Landing.css';

const features = [
  { icon: '✓', title: 'Quality Products', desc: 'Curated selection of premium products' },
  { icon: '📦', title: 'Fast Shipping', desc: 'Quick and reliable delivery to your door' },
  { icon: '💳', title: 'Secure Checkout', desc: 'Safe and secure payment processing' },
  { icon: '🤝', title: 'Great Support', desc: '24/7 customer support available' },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '99%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
];

const brands = ['Apple', 'Samsung', 'Sony', 'Logitech', 'Dell', 'Bose'];

const testimonials = [
  { name: 'Sarah M.', text: 'Amazing quality products and super fast delivery! Will definitely shop again.', rating: 5 },
  { name: 'James K.', text: 'Best online shopping experience. The checkout was smooth and secure.', rating: 5 },
  { name: 'Priya R.', text: 'Great customer support and premium products at reasonable prices.', rating: 4 },
];

const Landing = () => {
  const { products } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <AnimatedPage className="landing">
      <section className="hero">
        <div className="hero-bg-mesh" />
        <div className="hero-inner">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="hero-badge">New Collection 2026</span>
            <h1>Welcome to <span className="gradient-text">ShopHub</span></h1>
            <p>Your destination for quality products at great prices. Discover premium tech, accessories, and more.</p>
            <div className="hero-actions">
              <Link to="/products" className="cta-btn">Start Shopping</Link>
              <Link to="/about" className="cta-btn-outline">Learn More</Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <ProductImage
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format"
              alt="Shopping experience"
              className="hero-img-wrapper"
              imgClassName="hero-img"
            />
          </motion.div>
        </div>
      </section>

      <section className="stats-bar">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section className="features">
        <ScrollReveal>
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">Everything you need for a seamless shopping experience</p>
        </ScrollReveal>
        <div className="features-grid">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <motion.div
                className="feature-card"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(102,126,234,0.2)' }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="brands-strip">
        <p className="brands-label">Trusted by leading brands</p>
        <div className="brands-scroll">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="brand-name">{brand}</span>
          ))}
        </div>
      </section>

      <section className="featured-products">
        <ScrollReveal>
          <h2 className="section-title">Popular Products</h2>
          <p className="section-subtitle">Check out our bestsellers</p>
        </ScrollReveal>
        <div className="products-preview">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <ScrollReveal>
          <Link to="/products" className="view-all-btn">View All Products →</Link>
        </ScrollReveal>
      </section>

      <section className="testimonials">
        <ScrollReveal>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real shoppers</p>
        </ScrollReveal>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <motion.div
                className="testimonial-card"
                whileHover={{ y: -6 }}
              >
                <div className="testimonial-stars">{'⭐'.repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">— {t.name}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <ScrollReveal>
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates and exclusive offers</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </ScrollReveal>
      </section>
    </AnimatedPage>
  );
};

export default Landing;
