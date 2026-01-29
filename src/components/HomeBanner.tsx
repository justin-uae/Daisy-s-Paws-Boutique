import { PawPrint, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBannerImages } from '../services/shopifyService';
import Banner2 from '../assets/Banner2.png'
import Banner3 from '../assets/Banner3.png'
import Banner4 from '../assets/Banner4.png'
import PawsAnimated from './Skeletons/PawsAnimated';

// Fallback images if Shopify fetch fails
const FALLBACK_IMAGES = [Banner2, Banner3, Banner4];

export default function HomepageBanner() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bannerImages, setBannerImages] = useState<string[]>(FALLBACK_IMAGES);
    const [loading, setLoading] = useState(true);

    // Fetch banner images from Shopify collection
    useEffect(() => {
        const loadBannerImages = async () => {
            try {
                setLoading(true);
                const images = await fetchBannerImages('frontpage');

                if (images && images.length > 0) {
                    setBannerImages(images);
                } else {
                    setBannerImages(FALLBACK_IMAGES);
                }
            } catch (error) {
                setBannerImages(FALLBACK_IMAGES);
            } finally {
                setLoading(false);
            }
        };

        loadBannerImages();
    }, []);

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (bannerImages.length <= 1) return; // Don't auto-slide if only 1 image

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [bannerImages.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <div className="relative">
                <div className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[30rem] lg:min-h-[35rem] bg-[#e1cfbd] overflow-hidden">
                    {/* Banner content container */}
                    <PawsAnimated />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8 sm:py-12">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
                            {/* Left side - Text content */}
                            <div className="w-full lg:w-[45%] text-left relative">
                                <div className="absolute -top-8 -left-6 w-20 h-20 opacity-20 hidden sm:block">
                                    <svg viewBox="0 0 100 100" className="text-[#252120]" fill="currentColor">
                                        <path d="M20,45 Q20,35 30,35 Q40,35 40,45 L40,55 Q40,65 30,65 Q20,65 20,55 Z" />
                                        <rect x="35" y="40" width="30" height="20" rx="3" />
                                        <path d="M60,45 Q60,35 70,35 Q80,35 80,45 L80,55 Q80,65 70,65 Q60,65 60,55 Z" />
                                    </svg>
                                </div>

                                <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Trendy & Stylish
                                    <span className="block text-gray-900 mt-1 sm:mt-2 relative">
                                        Dog Clothing
                                        <svg className="absolute -right-10 top-2 w-8 h-8 text-gray-900 opacity-60 hidden xl:block" viewBox="0 0 100 100" fill="currentColor">
                                            <ellipse cx="50" cy="65" rx="12" ry="16" />
                                            <ellipse cx="38" cy="48" rx="6" ry="9" />
                                            <ellipse cx="50" cy="44" rx="6" ry="9" />
                                            <ellipse cx="62" cy="48" rx="6" ry="9" />
                                        </svg>
                                    </span>
                                    <span className="block text-gray-900 text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-1 sm:mt-2">
                                        & Accessories
                                    </span>
                                </h1>

                                <div className="mb-6 sm:mb-8 md:mb-10 max-w-2xl relative">
                                    <p className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
                                        Style your pup in comfort with our premium collection of dog apparel and accessories
                                    </p>

                                    <svg className="absolute -bottom-4 right-4 w-12 h-12 text-[#A79A95] opacity-40 transform rotate-12 hidden sm:block" viewBox="0 0 100 100" fill="currentColor">
                                        <path d="M20,45 Q20,35 30,35 Q40,35 40,45 L40,55 Q40,65 30,65 Q20,65 20,55 Z" />
                                        <rect x="35" y="40" width="30" height="20" rx="3" />
                                        <path d="M60,45 Q60,35 70,35 Q80,35 80,45 L80,55 Q80,65 70,65 Q60,65 60,55 Z" />
                                    </svg>
                                </div>

                                <div className="flex justify-start lg:justify-start">
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="w-full sm:w-auto bg-gradient-to-r from-[#3B3634] to-[#6b5d52] hover:from-[#6b5d52] hover:to-[#5a4d42] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 group"
                                    >
                                        <span>Shop Collection</span>
                                        <PawPrint className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Right side - Image Slider */}
                            <div className="w-full lg:w-[43%] flex justify-center lg:justify-end relative mt-4 lg:mt-0">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <svg className="w-full h-full text-[#252120]" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </svg>
                                </div>

                                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10">
                                    {/* Slider Container */}
                                    <div className="relative overflow-hidden rounded-4xl">
                                        {loading ? (
                                            // Loading skeleton
                                            <div className="w-full h-[250px] sm:h-[300px] md:h-[450px] lg:h-[500px] bg-[#DED8D6] animate-pulse rounded-4xl flex items-center justify-center">
                                                <PawPrint className="w-16 h-16 text-[#A79A95] opacity-40" />
                                            </div>
                                        ) : (
                                            <>
                                                {/* Images */}
                                                <div
                                                    className="flex transition-transform duration-500 ease-in-out"
                                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                                >
                                                    {bannerImages.map((image, index) => (
                                                        <div key={index} className="min-w-full">
                                                            <img
                                                                src={image}
                                                                alt={`Dog Fashion Collection ${index + 1}`}
                                                                className="w-full h-[250px] sm:h-[300px] md:h-[450px] lg:h-[500px] object-cover"
                                                                loading={index === 0 ? "eager" : "lazy"}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Navigation Arrows - Only show if more than 1 image */}
                                                {bannerImages.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={prevSlide}
                                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                                                            aria-label="Previous image"
                                                        >
                                                            <ChevronLeft className="w-5 h-5 text-[#3B3634]" />
                                                        </button>
                                                        <button
                                                            onClick={nextSlide}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                                                            aria-label="Next image"
                                                        >
                                                            <ChevronRight className="w-5 h-5 text-[#3B3634]" />
                                                        </button>

                                                        {/* Dots Indicator */}
                                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                                            {bannerImages.map((_, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => goToSlide(index)}
                                                                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === index
                                                                        ? 'bg-[#3B3634] w-6'
                                                                        : 'bg-white/60 hover:bg-white/80'
                                                                        }`}
                                                                    aria-label={`Go to slide ${index + 1}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Promotional Banner - Flyer Colors */}
                <div className="bg-gradient-to-r from-[#9b8d7f] via-[#8a7d6f] to-[#9b8d7f] py-2 sm:py-3 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`
                        }}></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 text-[#f5f0e8] text-center">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce flex-shrink-0" />
                            </div>
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                                <span className="hidden md:inline">Warm Up Your Pup's Style — Special Savings Inside!</span>
                                <span className="hidden sm:inline md:hidden">Warm Up Your Pup's Style — Special Savings!</span>
                                <span className="sm:hidden">Warm Up Your Pup's Style!</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}