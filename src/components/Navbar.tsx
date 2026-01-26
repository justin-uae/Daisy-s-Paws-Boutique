import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from '../assets/Logo.png'
import { CurrencySwitcher } from './CurrencySwitcher';
import CartIcon from './CartIcon';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        const message = "Hello! I would like to inquire about your dog clothing and accessories.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Main Navbar - Boutique Pet Theme */}
            <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                        {/* Logo with Boutique Name - LEFT on mobile, stays left on desktop */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 sm:gap-3 group"
                        >
                            <div className="flex-shrink-0">
                                <img
                                    loading='lazy'
                                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transform group-hover:scale-110 transition-transform duration-300"
                                    src={Logo}
                                    alt="Daisy's Paws Boutique Logo"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-stone-900 text-sm sm:text-lg lg:text-2xl font-bold leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Daisy's Paws
                                </h1>
                                <span className="text-stone-700 text-[10px] sm:text-xs lg:text-base font-semibold leading-tight">
                                    Boutique
                                </span>
                            </div>
                        </Link>


                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-stone-700 to-stone-800 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/products"
                                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors relative group"
                            >
                                Products
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-stone-700 to-stone-800 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors relative group"
                            >
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-stone-700 to-stone-800 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/contact"
                                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-stone-700 to-stone-800 group-hover:w-full transition-all duration-300"></span>
                            </Link>

                        </div>

                        {/* Right Side - Desktop: Currency, Cart, WhatsApp */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="border-r border-stone-200 pr-4">
                                <CurrencySwitcher />
                            </div>
                            <CartIcon />
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                <span>Connect on WhatsApp</span>
                            </button>
                        </div>

                        {/* Mobile: Cart Icon + Menu Button - RIGHT SIDE */}
                        <div className="lg:hidden flex items-center gap-2 ml-auto">
                            <CartIcon />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-stone-700 hover:text-stone-900 p-2"
                                aria-label="mobile-menu-button"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden pb-4 border-t border-stone-100">
                            <div className="flex flex-col space-y-1 pt-4">
                                <Link
                                    to="/"
                                    className="text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    className="text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <div className="border-t border-stone-100 pt-4 mt-4 px-4">
                                    <p className="text-xs font-bold text-stone-700 uppercase mb-2">Currency</p>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <CurrencySwitcher />
                                    </div>
                                </div>
                                <div className="border-t border-stone-100 pt-4 mt-4 px-4">
                                    <button
                                        onClick={() => {
                                            handleWhatsAppClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-full shadow-lg transition-all"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        <span>Connect on WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}