import { Link } from 'react-router-dom';
import { Home, PawPrint } from 'lucide-react';

export default function FallbackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F4ED] via-[#EBEAE9] to-[#DED8D6] flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration with Paw Prints */}
                <div className="mb-8 relative">
                    <div className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-br from-[#8B5A3C] via-[#6D4C41] to-[#5D4037] bg-clip-text" style={{ fontFamily: 'Georgia, serif' }}>
                        404
                    </div>
                    {/* Decorative paw prints */}
                    <PawPrint className="absolute top-0 -left-8 w-12 h-12 text-[#D4A798] opacity-40 animate-bounce" />
                    <PawPrint className="absolute bottom-0 -right-8 w-16 h-16 text-[#C19A8B] opacity-30 animate-pulse" />
                </div>

                {/* Content */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-[#DED8D6]">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#5D4037] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        Page Coming Soon!
                    </h1>
                    <p className="text-lg sm:text-xl text-[#6D4C41] mb-8 font-medium leading-relaxed">
                        We're working hard to bring you this page. In the meantime, explore our amazing collection of dog fashion and accessories!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] hover:from-[#6D4C41] hover:to-[#8B5A3C] text-white font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Home className="w-5 h-5" />
                            Go to Homepage
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#D4A798] hover:border-[#8B5A3C] hover:bg-[#F8F4ED] text-[#5D4037] font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105"
                        >
                            <PawPrint className="w-5 h-5" />
                            Shop Products
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 text-[#6D4C41]">
                    <p className="mb-4 font-semibold">Or try these pages:</p>
                    <div className="flex flex-wrap gap-3 justify-center font-medium">
                        <Link to="/" className="hover:text-[#8B5A3C] transition-colors">
                            Home
                        </Link>
                        <span className="text-[#D4A798]">•</span>
                        <Link to="/products" className="hover:text-[#8B5A3C] transition-colors">
                            Products
                        </Link>
                        <span className="text-[#D4A798]">•</span>
                        <Link to="/about" className="hover:text-[#8B5A3C] transition-colors">
                            About Us
                        </Link>
                        <span className="text-[#D4A798]">•</span>
                        <Link to="/contact" className="hover:text-[#8B5A3C] transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Decorative bottom paw prints */}
                <div className="mt-12 flex justify-center gap-4 opacity-20">
                    <PawPrint className="w-8 h-8 text-[#8B5A3C]" />
                    <PawPrint className="w-6 h-6 text-[#D4A798]" />
                    <PawPrint className="w-8 h-8 text-[#6D4C41]" />
                </div>
            </div>
        </div>
    );
}