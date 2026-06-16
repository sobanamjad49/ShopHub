import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollProgressBar from './ScrollProgressBar';
import BottomNav from './BottomNav';
import ChatAssistant from './ChatAssistant';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-layout has-bottom-nav">
      <ScrollProgressBar />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
      <ChatAssistant />
    </div>
  );
};

export default Layout;
