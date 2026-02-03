import { Zap, Users, ArrowRight, Star, Sparkles, Award, Shield, Clock, CheckCircle, TrendingUp, Heart, Globe, Phone, Mail, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {

    const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Brighter Flyer Theme */}
            <div className="relative bg-gradient-to-br from-[#f5f0e8] via-[#f0e8dc] to-[#e8dfd3] py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
                {/* Animated paw prints pattern */}
                <div className="absolute inset-0 opacity-10">
                    {/* Animated paw 1 */}
                    <div className="absolute top-20 right-20 w-32 h-32 text-[#a69888] animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                    {/* Animated paw 2 */}
                    <div className="absolute bottom-40 left-10 w-40 h-40 text-[#b8a898] animate-pulse" style={{ animationDuration: '2.5s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                    {/* Animated paw 3 */}
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 text-[#c4b5a0] animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.5s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                    {/* Animated paw 4 */}
                    <div className="absolute top-1/3 right-1/3 w-28 h-28 text-[#b0a090] animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '1s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#e8dfd3] to-[#d4c4b0] border-2 border-[#c4b5a0] rounded-full shadow-lg">
                        <Sparkles className="w-4 h-4 text-[#8a7d6f]" />
                        <span className="text-[#6b5d52] text-sm sm:text-base font-black uppercase tracking-wider">Our Story</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 px-2 leading-tight">
                        Where Luxury Meets{' '}
                        <span className="block mt-2 bg-gradient-to-r from-[#a69888] via-[#9b8d7f] to-[#8a7d6f] bg-clip-text text-transparent">
                            Pet Pampering
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 font-medium">
                        Curating premium products and exceptional experiences for the most cherished members of your family
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-[#b8a898]">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <PawPrint className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Premium Selection</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Handpicked luxury products for discerning pet parents</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-[#b8a898]">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Top Quality Brands</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Only the finest products from trusted manufacturers</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-[#b8a898]">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Fast Delivery</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Quick shipping to keep your furry friends happy</p>
                    </div>

                    <div className="group p-7 sm:p-8 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:border-[#b8a898]">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Expert Support</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">24/7 assistance from pet care specialists</p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision - Brighter */}
            <div className="relative bg-gradient-to-br from-[#a69888] via-[#9b8d7f] to-[#8a7d6f] py-12 sm:py-16 md:py-20 px-4 sm:px-6 my-8 sm:my-12 overflow-hidden">
                {/* Animated decorative paw prints */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-48 h-48 text-[#e8dfd3] animate-pulse" style={{ animationDuration: '4s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                    <div className="absolute bottom-10 left-10 w-48 h-48 text-[#d4c4b0] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="65" rx="15" ry="20" />
                            <ellipse cx="35" cy="45" rx="8" ry="12" />
                            <ellipse cx="50" cy="40" rx="8" ry="12" />
                            <ellipse cx="65" cy="45" rx="8" ry="12" />
                        </svg>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-[#e8dfd3]/30 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-8 h-8 text-[#e8dfd3]" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Mission</h2>
                            </div>
                            <p className="text-base sm:text-lg text-[#f5f0e8] leading-relaxed font-medium">
                                To provide exceptional pet products and create memorable experiences that celebrate the special bond between pets and their families. Every tail wag and purr matters to us.
                            </p>
                        </div>
                        <div className="text-white bg-white/10 backdrop-blur-sm border border-[#e8dfd3]/30 rounded-3xl p-8 hover:bg-white/15 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-8 h-8 text-[#e8dfd3]" />
                                <h2 className="text-3xl sm:text-4xl font-black">Our Vision</h2>
                            </div>
                            <p className="text-base sm:text-lg text-[#f5f0e8] leading-relaxed font-medium">
                                To become the UK's most trusted pet boutique, known for premium quality, exceptional service, and our unwavering commitment to pet wellness and happiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#e8dfd3] border-2 border-[#d4c4b0] px-4 py-2 rounded-full mb-4 shadow-lg">
                        <Star className="w-4 h-4 text-[#8a7d6f]" />
                        <span className="text-[#6b5d52] text-sm font-bold uppercase tracking-wider">Benefits</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Why Choose Paws Boutique?</h2>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        Experience the difference in premium pet care
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-xl transition-all hover:border-[#b8a898]">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#a69888] to-[#8a7d6f] flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Vet-Approved Products</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">All items carefully selected and recommended by veterinary professionals</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-xl transition-all hover:border-[#b8a898]">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#a69888] to-[#8a7d6f] flex items-center justify-center shadow-lg">
                            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Best Value Guarantee</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Premium quality at competitive prices with exclusive member discounts</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-xl transition-all hover:border-[#b8a898]">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#a69888] to-[#8a7d6f] flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">Safe & Secure</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Encrypted checkout and pet-safe product guarantees</p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] border-2 border-[#d4c4b0] rounded-2xl hover:shadow-xl transition-all hover:border-[#b8a898]">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#a69888] to-[#8a7d6f] flex items-center justify-center shadow-lg">
                            <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="font-black text-base sm:text-lg text-gray-900 mb-2">World-Wide Delivery</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium">Fast shipping with tracking</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* CTA Section - Brighter */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                <div className="relative bg-gradient-to-br from-[#a69888] via-[#9b8d7f] to-[#8a7d6f] rounded-3xl p-10 sm:p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
                    {/* Animated decorative paw print */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-[#e8dfd3] animate-pulse" style={{ animationDuration: '3s' }}>
                            <svg viewBox="0 0 100 100" fill="currentColor">
                                <ellipse cx="50" cy="65" rx="15" ry="20" />
                                <ellipse cx="35" cy="45" rx="8" ry="12" />
                                <ellipse cx="50" cy="40" rx="8" ry="12" />
                                <ellipse cx="65" cy="45" rx="8" ry="12" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#e8dfd3]/40 shadow-lg">
                            <PawPrint className="w-4 h-4 text-[#e8dfd3]" />
                            <span className="text-[#f5f0e8] text-sm font-bold uppercase tracking-wider">Start Shopping</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 sm:mb-5">Ready to Pamper Your Pet?</h2>
                        <p className="text-lg sm:text-xl text-[#f5f0e8] mb-8 sm:mb-10 max-w-2xl mx-auto px-2 font-medium">
                            Explore our curated collection of premium pet products and treat your furry friend to the luxury they deserve
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#d4c4b0] to-[#c4b5a0] hover:from-[#e8dfd3] hover:to-[#d4c4b0] text-[#6b5d52] rounded-full font-black text-lg sm:text-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                            >
                                <PawPrint className="w-5 h-5 sm:w-6 sm:h-6" />
                                Shop Now
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <div className="inline-flex items-center gap-2 bg-white border-2 border-[#d4c4b0] px-4 py-2 rounded-full mb-4 shadow-lg">
                            <Users className="w-4 h-4 text-[#8a7d6f]" />
                            <span className="text-[#6b5d52] text-sm font-bold uppercase tracking-wider">Contact Us</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Get in Touch</h3>
                        <p className="text-lg text-gray-600 font-medium">We're here to help you and your pets</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-[#d4c4b0] hover:shadow-xl transition-all hover:border-[#b8a898] text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Email Us</h4>
                            <p className="text-sm sm:text-base text-[#8a7d6f] font-bold break-all">{companyEmail}</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-[#d4c4b0] hover:shadow-xl transition-all hover:border-[#b8a898] text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Call Us</h4>
                            <p className="text-sm sm:text-base text-[#8a7d6f] font-bold">+{phoneNumber}</p>
                        </div>

                        <div className="p-7 sm:p-8 bg-white rounded-2xl shadow-lg border-2 border-[#d4c4b0] hover:shadow-xl transition-all hover:border-[#b8a898] text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#a69888] to-[#8a7d6f] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-black text-base sm:text-lg text-gray-900 mb-2">Support Hours</h4>
                            <p className="text-sm sm:text-base text-gray-700 font-bold">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}