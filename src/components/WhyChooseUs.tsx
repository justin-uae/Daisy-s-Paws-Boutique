import { Shield, Award, Headphones, Users, Star, PawPrint, ArrowRight, Heart, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyChooseUs() {
    const features = [
        {
            icon: Shield,
            title: "Premium Quality",
            description: "100% authentic, high-quality dog clothing and accessories"
        },
        {
            icon: Award,
            title: "Best Prices",
            description: "Luxury pet fashion at affordable, competitive prices"
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Expert advice for all your pet styling needs"
        },
        {
            icon: Heart,
            title: "Pet-First Care",
            description: "Designed with your furry friend's comfort in mind"
        }
    ];

    const stats = [
        {
            icon: Users,
            number: "50K+",
            label: "Happy Pet Parents"
        },
        {
            icon: Star,
            number: "4.9/5",
            label: "Customer Rating"
        },
        {
            icon: Package,
            number: "Premium",
            label: "Quality Fabrics"
        },
        {
            icon: PawPrint,
            number: "100%",
            label: "Pet-Safe Materials"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-white via-[#f5f0e8] to-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
            {/* Animated decorative paw prints background - Flyer Colors */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large animated paw - top left */}
                <svg className="absolute top-20 left-10 w-32 h-32 text-[#c4b5a0] opacity-15 animate-pulse" style={{ animationDuration: '3s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="15" ry="20" />
                    <ellipse cx="35" cy="45" rx="8" ry="12" />
                    <ellipse cx="50" cy="40" rx="8" ry="12" />
                    <ellipse cx="65" cy="45" rx="8" ry="12" />
                </svg>

                {/* Large animated paw - bottom right */}
                <svg className="absolute bottom-40 right-20 w-40 h-40 text-[#d4c4b0] opacity-15 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="15" ry="20" />
                    <ellipse cx="35" cy="45" rx="8" ry="12" />
                    <ellipse cx="50" cy="40" rx="8" ry="12" />
                    <ellipse cx="65" cy="45" rx="8" ry="12" />
                </svg>

                {/* Medium animated paw - middle right */}
                <svg className="absolute top-1/2 right-10 w-24 h-24 text-[#c4b5a0] opacity-15 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="12" ry="16" />
                    <ellipse cx="38" cy="48" rx="6" ry="9" />
                    <ellipse cx="50" cy="44" rx="6" ry="9" />
                    <ellipse cx="62" cy="48" rx="6" ry="9" />
                </svg>

                {/* Small animated paw - top right */}
                <svg className="absolute top-40 right-1/4 w-20 h-20 text-[#d4c4b0] opacity-20 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="10" ry="14" />
                    <ellipse cx="40" cy="46" rx="5" ry="8" />
                    <ellipse cx="50" cy="43" rx="5" ry="8" />
                    <ellipse cx="60" cy="46" rx="5" ry="8" />
                </svg>

                {/* Small animated paw - bottom left */}
                <svg className="absolute bottom-1/3 left-1/4 w-20 h-20 text-[#c4b5a0] opacity-20 animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '1.5s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="10" ry="14" />
                    <ellipse cx="40" cy="46" rx="5" ry="8" />
                    <ellipse cx="50" cy="43" rx="5" ry="8" />
                    <ellipse cx="60" cy="46" rx="5" ry="8" />
                </svg>

                {/* Trail of animated small paws - diagonal */}
                <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#d4c4b0] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.7s', transform: 'rotate(20deg)' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="9" ry="12" />
                    <ellipse cx="42" cy="48" rx="4" ry="7" />
                    <ellipse cx="50" cy="45" rx="4" ry="7" />
                    <ellipse cx="58" cy="48" rx="4" ry="7" />
                </svg>

                <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#c4b5a0] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.2s', transform: 'rotate(35deg) translateX(3rem) translateY(2rem)' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="9" ry="12" />
                    <ellipse cx="42" cy="48" rx="4" ry="7" />
                    <ellipse cx="50" cy="45" rx="4" ry="7" />
                    <ellipse cx="58" cy="48" rx="4" ry="7" />
                </svg>

                <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#d4c4b0] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.7s', transform: 'rotate(50deg) translateX(6rem) translateY(4rem)' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="9" ry="12" />
                    <ellipse cx="42" cy="48" rx="4" ry="7" />
                    <ellipse cx="50" cy="45" rx="4" ry="7" />
                    <ellipse cx="58" cy="48" rx="4" ry="7" />
                </svg>

                {/* Additional scattered animated paws */}
                <svg className="absolute top-2/3 right-1/3 w-18 h-18 text-[#c4b5a0] opacity-20 animate-pulse" style={{ animationDuration: '3.7s', animationDelay: '0.9s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="10" ry="14" />
                    <ellipse cx="40" cy="46" rx="5" ry="8" />
                    <ellipse cx="50" cy="43" rx="5" ry="8" />
                    <ellipse cx="60" cy="46" rx="5" ry="8" />
                </svg>

                <svg className="absolute top-1/4 left-1/2 w-22 h-22 text-[#d4c4b0] opacity-15 animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '1.8s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="12" ry="16" />
                    <ellipse cx="38" cy="48" rx="6" ry="9" />
                    <ellipse cx="50" cy="44" rx="6" ry="9" />
                    <ellipse cx="62" cy="48" rx="6" ry="9" />
                </svg>

                <svg className="absolute bottom-1/4 right-1/4 w-20 h-20 text-[#c4b5a0] opacity-20 animate-pulse" style={{ animationDuration: '3.3s', animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="60" rx="10" ry="14" />
                    <ellipse cx="40" cy="46" rx="5" ry="8" />
                    <ellipse cx="50" cy="43" rx="5" ry="8" />
                    <ellipse cx="60" cy="46" rx="5" ry="8" />
                </svg>

                <svg className="absolute top-3/4 left-20 w-24 h-24 text-[#d4c4b0] opacity-15 animate-pulse" style={{ animationDuration: '3.9s', animationDelay: '2s' }} viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="12" ry="16" />
                    <ellipse cx="38" cy="48" rx="6" ry="9" />
                    <ellipse cx="50" cy="44" rx="6" ry="9" />
                    <ellipse cx="62" cy="48" rx="6" ry="9" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-14 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f5f0e8] to-[#e8dfd3] px-4 py-2 rounded-full mb-4 border border-[#d4c4b0]">
                        <PawPrint className="w-4 h-4 text-[#9b8d7f]" />
                        <span className="text-[#6b5d52] text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#6b5d52] mb-4 sm:mb-5" style={{ fontFamily: 'Georgia, serif' }}>
                        Your Pet's Style
                        <span className="block bg-gradient-to-r from-[#9b8d7f] via-[#8a7d6f] to-[#9b8d7f] bg-clip-text text-transparent">
                            Destination
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#6b5d52] max-w-3xl mx-auto px-4 font-medium">
                        We are dedicated to keeping your furry companion stylish, comfortable, and happy with premium dog fashion and accessories
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-24">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border-2 border-[#918172] hover:border-[#9b8d7f] relative overflow-hidden"
                            >
                                {/* Paw pattern overlay */}
                                <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#9b8d7f] fill-current">
                                        <ellipse cx="50" cy="65" rx="15" ry="20" />
                                        <ellipse cx="35" cy="45" rx="8" ry="12" />
                                        <ellipse cx="50" cy="40" rx="8" ry="12" />
                                        <ellipse cx="65" cy="45" rx="8" ry="12" />
                                    </svg>
                                </div>

                                <div className="relative bg-gradient-to-br from-[#9b8d7f] via-[#8a7d6f] to-[#6b5d52] w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-[#6b5d52] mb-2 sm:mb-3 group-hover:text-[#9b8d7f] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-[#6b5d52] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className="relative bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 border-2 border-[#d4c4b0] overflow-hidden">
                    {/* Decorative paw pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full text-[#9b8d7f] fill-current">
                            <ellipse cx="100" cy="130" rx="30" ry="40" />
                            <ellipse cx="70" cy="90" rx="16" ry="24" />
                            <ellipse cx="100" cy="80" rx="16" ry="24" />
                            <ellipse cx="130" cy="90" rx="16" ry="24" />
                        </svg>
                    </div>

                    <div className="relative">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#6b5d52] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                Trusted By Pet Parents
                            </h3>
                            <p className="text-[#6b5d52] text-sm sm:text-base font-medium">Serving furry friends with style and care</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={index} className="text-center group">
                                        <div className="bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-[#d4c4b0]">
                                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#9b8d7f]" />
                                        </div>
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#9b8d7f] via-[#8a7d6f] to-[#9b8d7f] bg-clip-text text-transparent mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-xs sm:text-sm md:text-base text-[#6b5d52] font-bold">
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA Banner with Pet Theme */}
                <div className="mt-12 sm:mt-16 md:mt-20 relative bg-gradient-to-r from-[#9b8d7f] via-[#8a7d6f] to-[#9b8d7f] rounded-3xl p-8 sm:p-10 md:p-14 text-center shadow-2xl overflow-hidden">
                    {/* Animated paw print pattern overlay */}
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute top-10 left-10 w-20 h-20 text-[#f5f0e8] animate-pulse" style={{ animationDuration: '3s', transform: 'rotate(15deg)' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <ellipse cx="50" cy="65" rx="15" ry="20" />
                                <ellipse cx="35" cy="45" rx="8" ry="12" />
                                <ellipse cx="50" cy="40" rx="8" ry="12" />
                                <ellipse cx="65" cy="45" rx="8" ry="12" />
                            </svg>
                        </div>
                        <div className="absolute bottom-10 right-10 w-24 h-24 text-[#e8dfd3] animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s', transform: 'rotate(-20deg)' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <ellipse cx="50" cy="65" rx="15" ry="20" />
                                <ellipse cx="35" cy="45" rx="8" ry="12" />
                                <ellipse cx="50" cy="40" rx="8" ry="12" />
                                <ellipse cx="65" cy="45" rx="8" ry="12" />
                            </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/4 w-16 h-16 text-[#d4c4b0] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s', transform: 'rotate(45deg)' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <ellipse cx="50" cy="65" rx="12" ry="16" />
                                <ellipse cx="38" cy="48" rx="6" ry="9" />
                                <ellipse cx="50" cy="44" rx="6" ry="9" />
                                <ellipse cx="62" cy="48" rx="6" ry="9" />
                            </svg>
                        </div>
                        <div className="absolute top-1/3 right-1/4 w-18 h-18 text-[#e8dfd3] animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '1.5s', transform: 'rotate(-30deg)' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <ellipse cx="50" cy="65" rx="12" ry="16" />
                                <ellipse cx="38" cy="48" rx="6" ry="9" />
                                <ellipse cx="50" cy="44" rx="6" ry="9" />
                                <ellipse cx="62" cy="48" rx="6" ry="9" />
                            </svg>
                        </div>
                        <div className="absolute bottom-1/3 left-1/3 w-14 h-14 text-[#f5f0e8] animate-pulse" style={{ animationDuration: '3.8s', animationDelay: '0.8s', transform: 'rotate(60deg)' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                <ellipse cx="50" cy="60" rx="10" ry="14" />
                                <ellipse cx="40" cy="46" rx="5" ry="8" />
                                <ellipse cx="50" cy="43" rx="5" ry="8" />
                                <ellipse cx="60" cy="46" rx="5" ry="8" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-[#d4c4b0]/30">
                            <PawPrint className="w-4 h-4 text-[#f5f0e8]" />
                            <span className="text-[#f5f0e8] text-xs sm:text-sm font-bold uppercase tracking-wider">Shop Now</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 px-2 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
                            Ready to Style Your Pup?
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-[#f5f0e8] mb-8 sm:mb-10 max-w-2xl mx-auto px-4 font-medium drop-shadow">
                            Explore our complete collection of premium dog clothing, accessories, and stylish essentials for your beloved companion
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                            <Link to={'/products'} className="w-full sm:w-auto">
                                <button className="group w-full sm:w-auto bg-gradient-to-r from-[#f5f0e8] to-[#e8dfd3] hover:from-white hover:to-[#f5f0e8] text-[#6b5d52] font-bold px-8 sm:px-10 py-4 text-base sm:text-lg rounded-full transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2">
                                    <PawPrint className="w-5 h-5" />
                                    <span>Shop Collection</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        {/* Decorative divider */}
                        <div className="mt-8 flex items-center justify-center gap-4 text-[#d4c4b0]">
                            <div className="w-16 h-0.5 bg-[#d4c4b0]/30"></div>
                            <Heart className="w-5 h-5" />
                            <div className="w-16 h-0.5 bg-[#d4c4b0]/30"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}