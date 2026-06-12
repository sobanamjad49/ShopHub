import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollProgressBar from './ScrollProgressBar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <ScrollProgressBar />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
