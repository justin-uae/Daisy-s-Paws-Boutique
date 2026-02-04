import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, PawPrint, Sparkles, Filter, Package } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllProducts } from '../slices/productsSlice';
import { useCurrency } from '../hooks/useCurrency';
import ProductCard from '../components/ProductCard';

const ViewAllProducts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const { products, loading } = useAppSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categoryFromQuery = searchParams.get('category') || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
    const [sortBy, setSortBy] = useState('rating');
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category).filter(Boolean))
    ).sort();

    useEffect(() => {
        if (categoryFromQuery) {
            setSelectedCategory(categoryFromQuery);
        }
    }, [categoryFromQuery]);

    useEffect(() => {
        let filtered = [...products];

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, sortBy, products]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSortBy('rating');
        navigate('/products');
    };

    const activeFiltersCount = () => {
        let count = 0;
        if (searchQuery) count++;
        if (selectedCategory) count++;
        return count;
    };

    const goToDetail = (productId: string) => {
        const id = productId.split('/').pop();
        navigate(`/products/${id}`);
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-[#FFF9F0] to-white">
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={products.length}
                selectedCategory={selectedCategory}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border-2 border-[#918172] rounded-xl shadow-md hover:shadow-lg hover:border-[#918172] transition-all font-semibold text-[#918172]"
                    >
                        <Filter className="w-5 h-5 text-[#8B5A3C]" />
                        <span>
                            Filters {activeFiltersCount() > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-[#918172] to-[#918172] text-white text-xs font-bold rounded-full">
                                    {activeFiltersCount()}
                                </span>
                            )}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                        <FilterSidebar
                            uniqueCategories={uniqueCategories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilters && (
                        <MobileFilterDrawer
                            uniqueCategories={uniqueCategories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            clearFilters={clearFilters}
                            onClose={() => setShowMobileFilters(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort and Results */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-[#8B5A3C]" />
                                <p className="text-[#6D4C41] font-medium">
                                    <span className="font-bold text-[#918172] text-lg">{filteredProducts.length}</span>
                                    <span className="ml-1">{filteredProducts.length === 1 ? 'product' : 'products'} available</span>
                                    {selectedCategory && (
                                        <span className="ml-2 text-[#8B5A3C] font-bold">in {selectedCategory}</span>
                                    )}
                                </p>
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5A3C]" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full sm:w-auto pl-10 pr-4 py-2.5 border-2 border-[#918172] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#918172] focus:border-transparent bg-white font-semibold text-[#918172] shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    <option value="rating">Top Rated</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(selectedCategory || searchQuery) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-[#F5EDE4] border border-[#918172] rounded-xl">
                                <span className="text-sm font-semibold text-[#918172]">Active filters:</span>
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#918172] rounded-full text-sm font-medium text-[#918172]">
                                        <PawPrint className="w-3.5 h-3.5 text-[#8B5A3C]" />
                                        {selectedCategory}
                                        <button
                                            onClick={() => setSelectedCategory('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#918172] rounded-full text-sm font-medium text-[#918172]">
                                        <Search className="w-3.5 h-3.5 text-[#8B5A3C]" />
                                        "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="ml-1 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="ml-auto text-sm font-semibold text-[#8B5A3C] hover:text-[#918172] underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Results Grid */}
                        {filteredProducts.length === 0 ? (
                            <EmptyState clearFilters={clearFilters} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                        goToDetail={goToDetail}
                                        formatPrice={formatPrice}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

// Hero Section Component
const HeroSection = ({ searchQuery, setSearchQuery, selectedCategory }: any) => (
    <div className="relative bg-gradient-to-br from-[#F8F4ED] via-[#FFF9F0] to-[#F5EDE4] overflow-hidden py-12 sm:py-16 md:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-32 h-32 text-[#4A4341] animate-bounce" >
                <svg className="absolute top-10 right-10 w-32 h-32 text-[#4A4341]" viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="50" cy="65" rx="12" ry="16" />
                    <ellipse cx="38" cy="48" rx="6" ry="9" />
                    <ellipse cx="50" cy="44" rx="6" ry="9" />
                    <ellipse cx="62" cy="48" rx="6" ry="9" />
                </svg>
            </div>
            <div className="absolute bottom-10 left-10 w-40 h-40 text-[#4A4341] animate-pulse" >
                <svg className="absolute bottom-10 left-10 w-40 h-40 text-[#4A4341]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20,45 Q20,35 30,35 Q40,35 40,45 L40,55 Q40,65 30,65 Q20,65 20,55 Z" />
                    <rect x="35" y="40" width="30" height="20" rx="3" />
                    <path d="M60,45 Q60,35 70,35 Q80,35 80,45 L80,55 Q80,65 70,65 Q60,65 60,55 Z" />
                </svg>
            </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-[#918172]" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedCategory ? (
                    <>
                        {selectedCategory} <span className="text-[#8B5A3C]">Collection</span>
                    </>
                ) : (
                    <>
                        Premium Dog<br />
                        <span className="text-[#918172]">Fashion & Accessories</span>
                    </>
                )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#6D4C41] mb-6 sm:mb-8 font-medium max-w-3xl mx-auto">
                Discover stylish outfits and essential accessories for your beloved furry friend
            </p>

            <div className="max-w-2xl mx-auto w-full">
                <div className="relative group">
                    <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-[#918172] group-focus-within:text-[#8B5A3C] transition-colors z-10" />
                    <input
                        type="text"
                        placeholder="Search outfits, accessories, collars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="relative w-full pl-12 sm:pl-14 md:pl-16 pr-12 sm:pr-14 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl bg-white text-[#918172] text-sm sm:text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-[#918172] shadow-xl font-medium border-2 border-transparent focus:border-[#918172] transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#F5EDE4] rounded-full transition-colors z-10"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A3C]" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Filter Sidebar Component
const FilterSidebar = ({ uniqueCategories, selectedCategory, setSelectedCategory, clearFilters }: any) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border-2 border-[#918172]">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#918172]">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#8B5A3C]" />
                <h2 className="text-xl font-black text-[#918172]" style={{ fontFamily: 'Georgia, serif' }}>Filters</h2>
            </div>
            <button
                onClick={clearFilters}
                className="text-sm text-[#8B5A3C] hover:text-[#918172] font-bold hover:underline transition-colors"
            >
                Reset
            </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6 pb-6 border-b-2 border-[#918172] last:border-0">
            <h3 className="font-bold text-[#918172] mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#918172] to-[#918172] rounded-full"></span>
                Category
            </h3>
            <div className="space-y-2">
                <button
                    onClick={() => setSelectedCategory('')}
                    className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${!selectedCategory
                        ? 'bg-gradient-to-r from-[#918172] to-[#918172] text-white shadow-md'
                        : 'hover:bg-[#F5EDE4] text-[#918172]'
                        }`}
                >
                    <PawPrint className={`w-4 h-4 ${!selectedCategory ? 'text-white' : 'text-[#8B5A3C]'}`} />
                    All Products
                </button>
                {uniqueCategories.map((category: string) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === category
                            ? 'bg-gradient-to-r from-[#918172] to-[#918172] text-white shadow-md'
                            : 'hover:bg-[#F5EDE4] text-[#918172]'
                            }`}
                    >
                        <PawPrint className={`w-4 h-4 ${selectedCategory === category ? 'text-white' : 'text-[#8B5A3C]'}`} />
                        {category}
                    </button>
                ))}
            </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[#F5EDE4] to-[#F8F4ED] rounded-xl border border-[#918172]">
            <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#8B5A3C] flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-[#918172] text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>Need Help?</h4>
                    <p className="text-xs text-[#6D4C41] leading-relaxed">
                        Our pet fashion experts are here to help you find the perfect outfit for your furry friend
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// Mobile Filter Drawer
// Mobile Filter Drawer
const MobileFilterDrawer = ({ uniqueCategories, selectedCategory, setSelectedCategory, clearFilters, onClose }: any) => {

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        onClose();
    };

    const handleClearFilters = () => {
        clearFilters();
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn" onClick={onClose} />
            <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto shadow-2xl animate-slideInLeft">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#918172]">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-[#8B5A3C]" />
                            <h2 className="text-xl font-black text-[#918172]" style={{ fontFamily: 'Georgia, serif' }}>Filters</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[#F5EDE4] rounded-full transition-colors">
                            <X className="w-6 h-6 text-[#918172]" />
                        </button>
                    </div>

                    {/* Modified FilterSidebar content inline */}
                    <div className="bg-white rounded-2xl">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#918172]">
                            <div className="flex items-center gap-2">
                            </div>
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-[#8B5A3C] hover:text-[#918172] font-bold hover:underline transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6 pb-6 border-b-2 border-[#918172] last:border-0">
                            <h3 className="font-bold text-[#918172] mb-3 flex items-center gap-2">
                                <span className="w-1 h-5 bg-gradient-to-b from-[#918172] to-[#918172] rounded-full"></span>
                                Category
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleCategorySelect('')}
                                    className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${!selectedCategory
                                        ? 'bg-gradient-to-r from-[#918172] to-[#918172] text-white shadow-md'
                                        : 'hover:bg-[#F5EDE4] text-[#918172]'
                                        }`}
                                >
                                    <PawPrint className={`w-4 h-4 ${!selectedCategory ? 'text-white' : 'text-[#8B5A3C]'}`} />
                                    All Products
                                </button>
                                {uniqueCategories.map((category: string) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className={`group flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-[#918172] to-[#918172] text-white shadow-md'
                                            : 'hover:bg-[#F5EDE4] text-[#918172]'
                                            }`}
                                    >
                                        <PawPrint className={`w-4 h-4 ${selectedCategory === category ? 'text-white' : 'text-[#8B5A3C]'}`} />
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="mt-6 p-4 bg-gradient-to-br from-[#F5EDE4] to-[#F8F4ED] rounded-xl border border-[#918172]">
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-[#8B5A3C] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-[#918172] text-sm mb-1" style={{ fontFamily: 'Georgia, serif' }}>Need Help?</h4>
                                    <p className="text-xs text-[#6D4C41] leading-relaxed">
                                        Our pet fashion experts are here to help you find the perfect outfit for your furry friend
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Empty State
const EmptyState = ({ clearFilters }: any) => (
    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-[#918172]">
        <PawPrint className="w-32 h-32 text-[#E6B8A2] mx-auto mb-6" />
        <h3 className="text-2xl font-black text-[#918172] mb-3" style={{ fontFamily: 'Georgia, serif' }}>No Products Found</h3>
        <p className="text-[#6D4C41] mb-8 max-w-md mx-auto">
            We couldn't find any dog fashion items matching your search. Try adjusting your filters or search for a different style.
        </p>
        <button onClick={clearFilters} className="px-8 py-4 bg-gradient-to-r from-[#918172] via-[#918172] to-[#918172] text-white rounded-xl font-bold shadow-lg hover:shadow-xl">
            Clear All Filters
        </button>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-[#FFF9F0] to-white">
        <div className="bg-gradient-to-br from-[#F8F4ED] via-[#FFF9F0] to-[#F5EDE4] h-96 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-[#918172]">
                        <div className="h-64 bg-gradient-to-br from-[#F5EDE4] to-[#E6B8A2] animate-pulse"></div>
                        <div className="p-4">
                            <div className="h-4 w-20 bg-[#E6B8A2] rounded mb-2 animate-pulse"></div>
                            <div className="h-6 w-full bg-[#918172] rounded mb-2 animate-pulse"></div>
                            <div className="h-10 w-full bg-[#F5EDE4] rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ViewAllProducts;