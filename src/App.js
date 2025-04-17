import './App.css';
import './css/fonts.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import BridgingFinance from './pages/BridgingFinance';
import BuytoLet from './pages/BuytoLet';
import ResidentialMortgages from './pages/ResidentialMortgages';
import CommercialMortgages from './pages/CommercialMortgages';
import Home from './pages/Home';
import FixedRateReminder from './pages/FixedRateReminder';
import Configure from './pages/Configure';
import UrgentRemortgage from './pages/UrgentRemortgage';
import FirstTimeBuyers from './pages/FirstTimeBuyers';
import FAQs from './pages/FAQs';
import BlogPage from './pages/blog';
import MortgageProtection from './pages/MortgageProtection';
import ForeignNationals from './pages/ForeignNationals';

import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

const AppContent = () => {
  const location = useLocation();
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  // Initial full load
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-in-out',
    });

    const checkAllImagesLoaded = () => {
      const images = document.getElementsByTagName('img');
      let loaded = 0;

      if (images.length === 0) {
        setInitialLoading(false);
        return;
      }

      Array.from(images).forEach((image) => {
        if (image.complete) {
          loaded++;
        } else {
          image.onload = () => {
            loaded++;
            if (loaded === images.length) {
              setInitialLoading(false);
            }
          };
        }
      });

      if (images.length === loaded) {
        setInitialLoading(false);
      }
    };

    const handleLoad = () => {
      setTimeout(() => {
        checkAllImagesLoaded();
      }, 1000); // Delay to simulate smoothness
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Show loader on route change
  useEffect(() => {
    setRouteLoading(true);

    const timeout = setTimeout(() => {
      setRouteLoading(false);
      AOS.refresh();
    }, 300); // simulate transition

    return () => clearTimeout(timeout);
  }, [location]);

  if (initialLoading || routeLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bridging-finance" element={<BridgingFinance />} />
        <Route path="/buy-to-let" element={<BuytoLet />} />
        <Route path="/residential-mortgages" element={<ResidentialMortgages />} />
        <Route path="/commercial-mortgages" element={<CommercialMortgages />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/fixed-rate-reminder" element={<FixedRateReminder />} />
        <Route path="/urgent-remortgage" element={<UrgentRemortgage />} />
        <Route path="/first-time-buyers" element={<FirstTimeBuyers />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/mortage-protection" element={<MortgageProtection />} />
        <Route path="/foreign-nationals" element={<ForeignNationals />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
