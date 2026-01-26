import { Mail, Phone, MapPin, PawPrint, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import PaymentMethods from '../assets/payment.png'

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" }
  ];

  const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
  const appURL = import.meta.env.VITE_APP_URL;

  return (
    <footer className="bg-gradient-to-br from-[#6b5d52] via-[#8a7d6f] to-[#6b5d52] text-[#f5f0e8] py-10 relative overflow-hidden">
      {/* Paw print pattern overlay */}
      <div className="absolute inset-0 opacity-25">
        <svg className="absolute top-10 right-10 w-32 h-32 text-[#4B4543]" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="15" ry="20" />
          <ellipse cx="35" cy="45" rx="8" ry="12" />
          <ellipse cx="50" cy="40" rx="8" ry="12" />
          <ellipse cx="65" cy="45" rx="8" ry="12" />
        </svg>
        <svg className="absolute bottom-20 left-10 w-40 h-40 text-[#4B4543]" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="15" ry="20" />
          <ellipse cx="35" cy="45" rx="8" ry="12" />
          <ellipse cx="50" cy="40" rx="8" ry="12" />
          <ellipse cx="65" cy="45" rx="8" ry="12" />
        </svg>
        <svg className="absolute top-1/2 left-1/3 w-24 h-24 text-[#4B4543]" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="12" ry="16" />
          <ellipse cx="38" cy="48" rx="6" ry="9" />
          <ellipse cx="50" cy="44" rx="6" ry="9" />
          <ellipse cx="62" cy="48" rx="6" ry="9" />
        </svg>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9b8d7f] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Company Info with Logo */}
          <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group p-3">
              <img
                className="w-14 h-14 sm:w-16 sm:h-18 md:w-20 md:h-20 transform group-hover:scale-110 transition-transform"
                src={Logo}
                alt="Daisy's Paws Boutique Logo"
              />
            </Link>
            {/* Contact Info - Responsive Stack */}
            <div className="flex flex-col items-center md:items-start gap-3 mt-2">
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-[#9b8d7f] to-[#8a7d6f] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <span className="text-sm text-center md:text-left font-medium">28 College Avenue Crosby L23 0ss</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-[#9b8d7f] to-[#8a7d6f] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <a href={`tel:+${phoneNumber}`} className="text-sm hover:text-[#d4c4b0] transition-colors font-medium">
                  +{phoneNumber},
                </a>
                <a href={`tel:+${whatsappNumber}`} className="text-sm hover:text-[#d4c4b0] transition-colors font-medium">
                  +{whatsappNumber}
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-[#9b8d7f] to-[#8a7d6f] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 text-white flex-shrink-0" />
                </div>
                <a href={`mailto:${companyEmail}`} className="text-sm hover:text-[#d4c4b0] transition-colors break-all sm:break-normal font-medium">
                  {companyEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div>
              <h3 className="text-[#d4c4b0] font-bold text-sm uppercase tracking-wider mb-3 text-center md:text-right">Quick Links</h3>
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-bold hover:text-[#d4c4b0] transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4c4b0] to-[#e8dfd3] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="text-center md:text-right max-w-md mt-4">
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#d4c4b0]" />
                <span className="text-sm font-bold text-[#d4c4b0]">Our Mission</span>
              </div>
              <p className="text-xs text-[#e8dfd3] leading-relaxed">
                Providing premium, stylish dog clothing and accessories to keep your furry companion comfortable, fashionable, and loved.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-xs text-[#e8dfd3] font-medium">We Accept:</span>
          <div className="rounded-lg p-2 shadow-md bg-white/10">
            <img
              src={PaymentMethods}
              alt="Payment Methods: PayPal, Mastercard, Visa, Maestro, Apple Pay, Amazon Pay, Google Pay, Stripe"
              className="w-full max-w-xs h-auto"
            />
          </div>
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-[#9b8d7f]/50"></div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#d4c4b0]"></div>
            <div className="w-2 h-2 rounded-full bg-[#e8dfd3]"></div>
            <div className="w-2 h-2 rounded-full bg-[#d4c4b0]"></div>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-[#9b8d7f]/50"></div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-[#e8dfd3] font-medium">
            © 2025{' '}
            <a href={appURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4c4b0] hover:text-[#e8dfd3] font-bold transition-colors"
            >
              Daisy's Paws Boutique
            </a>
            {' '}• All rights reserved
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <PawPrint className="w-4 h-4 text-[#d4c4b0]" />
            <p className="text-xs text-[#d4c4b0]">Premium Dog Fashion & Accessories</p>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9b8d7f] to-transparent"></div>
    </footer>
  );
}