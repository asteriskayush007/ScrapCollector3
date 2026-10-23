import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';

// Pages
import Home from './pages/Home';
import PartsMarketplace from './pages/PartsMarketplace';
import ProductDetail from './pages/ProductDetail';
import SellParts from './pages/SellParts';
import ScrapPickup from './pages/ScrapPickup';
import MyPickups from './pages/MyPickups';
import StaffDashboard from './pages/StaffDashboard';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import WishlistPage from './pages/WishlistPage';
import About from './pages/About';
import HowItWorksPage from './pages/HowItWorksPage';
import ServicesPage from './pages/ServicesPage';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';

function AppContent() {
  const { activePage } = useApp();
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onHeroScrollProgress={setHeroScrollProgress} />;
      case 'parts':
        return <PartsMarketplace />;
      case 'product-detail':
        return <ProductDetail />;
      case 'sell':
        return <SellParts />;
      case 'scrap-pickup':
        return <ScrapPickup />;
      case 'my-pickups':
        return <MyPickups />;
      case 'admin':
        return <StaffDashboard />;
      case 'checkout':
        return <Checkout />;
      case 'profile':
      case 'orders':
        return <UserProfile />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <About />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'services':
        return <ServicesPage />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'legal':
        return <LegalPage />;
      default:
        return <Home onHeroScrollProgress={setHeroScrollProgress} />;
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Apple-Style Pill Header */}
      <Header heroScrollProgress={heroScrollProgress} />

      {/* Main Routed Page Content */}
      <div style={{ flex: 1 }}>{renderPage()}</div>

      {/* Slide-Over Shopping Bag Drawer */}
      <CartDrawer />

      {/* Floating Toast Alerts */}
      <ToastContainer />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
