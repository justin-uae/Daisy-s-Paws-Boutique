import { useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, PawPrint, Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllProducts } from '../slices/productsSlice';
import { useCurrency } from '../hooks/useCurrency';

export default function PopularProducts() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);

    const { products, loading } = useAppSelector((state) => state.products);
    const { formatPrice } = useCurrency();

    // Fetch products on mount
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    // Get first 10 products
    const displayProducts = products.slice(0, 10);

    const goToDetail = (productId: string) => {
        // Extract ID from Shopify GID
        const id = productId.split('/').pop();
        navigate(`/products/${id}`);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };


    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="bg-gradient-to-b from-[#f5f0e8] via-white to-[#f5f0e8] py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Decorative paw prints in background - Flyer Colors */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg className="absolute top-20 right-20 w-32 h-32 text-[#9b8d7f]" viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="15" ry="20" />
                    <ellipse cx="35" cy="45" rx="8" ry="12" />
                    <ellipse cx="50" cy="40" rx="8" ry="12" />
                    <ellipse cx="65" cy="45" rx="8" ry="12" />
                </svg>
                <svg className="absolute bottom-40 left-10 w-40 h-40 text-[#9b8d7f]" viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="15" ry="20" />
                    <ellipse cx="35" cy="45" rx="8" ry="12" />
                    <ellipse cx="50" cy="40" rx="8" ry="12" />
                    <ellipse cx="65" cy="45" rx="8" ry="12" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-[#9b8d7f]" />
                            <span className="text-[#9b8d7f] text-xs sm:text-sm font-bold uppercase tracking-wider">Customer Favorites</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            Popular Products
                        </h2>
                        <p className="text-[#6b5d52] text-sm sm:text-base font-medium mt-2">Loved by pet parents everywhere</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-white border-2 border-[#d4c4b0] hover:border-[#9b8d7f] hover:bg-[#f5f0e8] rounded-full p-3 transition-all shadow-md hover:shadow-lg group"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#9b8d7f] group-hover:text-[#6b5d52]" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-white border-2 border-[#d4c4b0] hover:border-[#9b8d7f] hover:bg-[#f5f0e8] rounded-full p-3 transition-all shadow-md hover:shadow-lg group"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-[#9b8d7f] group-hover:text-[#6b5d52]" />
                        </button>
                    </div>
                </div>

                {/* Products Scrollable Row */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer w-[75vw] sm:w-[45vw] md:w-[320px] lg:w-[300px] flex-shrink-0 transform hover:scale-[1.02] transition-all duration-300"
                            onClick={() => goToDetail(product.id)}
                        >
                            {/* Card Container */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e8dfd3] hover:border-[#9b8d7f]">
                                {/* Image */}
                                <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3]">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#6b5d52]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Bestseller Badge - Show for first 3 products */}
                                    {index < 3 && (
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#9b8d7f] to-[#8a7d6f] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Bestseller</span>
                                        </div>
                                    )}

                                    {/* Heart Icon - Top Right */}
                                    <div className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[#e8dfd3] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#9b8d7f] group-hover:fill-[#9b8d7f] transition-all" />
                                    </div>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-[#d4c4b0]">
                                        <div className="flex flex-col">
                                            {/* Original (Strikethrough) Price */}
                                            <span className="text-[10px] sm:text-xs text-[#8a7d6f] line-through leading-tight">
                                                {formatPrice(product.price + 10)}
                                            </span>
                                            {/* Current Price */}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-sm sm:text-base md:text-lg font-black text-[#6b5d52] leading-tight">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Badge */}
                                    {product.rating > 0 && (
                                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-lg border border-[#d4c4b0] flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#9b8d7f] text-[#9b8d7f]" />
                                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                                                {product.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5">
                                    {/* Category */}
                                    {product.category && (
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <PawPrint className="w-3.5 h-3.5 text-[#9b8d7f] flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-[#6b5d52] font-semibold truncate">
                                                {product.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-[#9b8d7f] transition-colors line-clamp-2 leading-tight mb-3 min-h-[2.5rem]">
                                        {product.title}
                                    </h3>

                                    {/* View Details Button */}
                                    <button className="w-full bg-[#f5f0e8] group-hover:bg-[#9b8d7f] text-[#6b5d52] group-hover:text-white font-bold text-sm py-2.5 sm:py-3 rounded-xl transition-all duration-300 border border-[#d4c4b0] group-hover:border-[#9b8d7f] shadow-sm group-hover:shadow-md flex items-center justify-center gap-2">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>View Product</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10 sm:mt-12 md:mt-14">
                    <Link to={"/products"}>
                        <button className="group relative bg-gradient-to-r from-[#9b8d7f] via-[#8a7d6f] to-[#9b8d7f] hover:from-[#8a7d6f] hover:via-[#6b5d52] hover:to-[#8a7d6f] text-white font-bold px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden border-2 border-[#8a7d6f]">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Browse All Products
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Paw print decoration in button */}
                            <PawPrint className="absolute top-1/2 -translate-y-1/2 -right-4 w-16 h-16 text-white/10 group-hover:text-white/20 transition-colors" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="bg-gradient-to-b from-[#f5f0e8] via-white to-[#f5f0e8] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-6 w-32 bg-[#e8dfd3] rounded mb-2 animate-pulse"></div>
                    <div className="h-10 w-64 bg-[#d4c4b0] rounded animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-6 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-[300px] flex-shrink-0">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e8dfd3]">
                            <div className="h-64 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd3] animate-pulse"></div>
                            <div className="p-4">
                                <div className="h-4 w-20 bg-[#e8dfd3] rounded mb-2 animate-pulse"></div>
                                <div className="h-6 w-full bg-[#d4c4b0] rounded mb-2 animate-pulse"></div>
                                <div className="h-10 w-full bg-[#e8dfd3] rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);