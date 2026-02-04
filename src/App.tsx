import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BrandedFallback } from './components/LoadingFallback';
import { initializeAuth } from './slices/authSlice';
import ScrollToTop from './helper/ScrollToTop';
import { useAppDispatch } from './hooks/useRedux';
import { WhatsAppButton } from './components/WhatsAppButton';
import { fetchExchangeRates } from './slices/currencySlice';
import { CartProvider } from './context/Cartcontext';
import { Toaster } from 'react-hot-toast';

const ExcursionsDubaiHero = lazy(() => import('./components/ExcursionsDubaiHero'));
const Footer = lazy(() => import('./components/Footer'));
const ItemDetailpage = lazy(() => import('./components/ItemDetailpage'));
const Navbar = lazy(() => import('./components/Navbar'));
const ContactUsPage = lazy(() => import('./components/ContactUs'));
const FallbackPage = lazy(() => import('./components/FallBackPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AboutPage = lazy(() => import('./pages/AboutUs'));
const ViewAllProducts = lazy(() => import('./pages/ViewAllProducts'))

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth on app load
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  useEffect(() => {
    // Fetch exchange rates on app load
    dispatch(fetchExchangeRates());

    // Refresh rates every 1 hour
    const interval = setInterval(() => {
      dispatch(fetchExchangeRates());
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [dispatch]);


  return (
    <BrowserRouter>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              fontWeight: '600',
            },
          }}
        />
        <ScrollToTop />
        <Suspense fallback={<BrandedFallback />}>
          <Navbar />
          <Routes>
            <Route path='/' element={<ExcursionsDubaiHero />} />
            <Route path='/products' element={<ViewAllProducts />} />
            <Route path='/products/:id' element={<ItemDetailpage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactUsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='*' element={<FallbackPage />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;