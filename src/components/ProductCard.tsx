import { Heart, ShoppingBag, Package, PawPrint } from 'lucide-react';

const ProductCard = ({ product, goToDetail, formatPrice }: any) => {
    // Check if product is out of stock (all variants unavailable)
    const isOutOfStock = product.availableForSale === false;
    
    return (
        <div
            onClick={() => !isOutOfStock && goToDetail(product.id)}
            className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border-2 ${
                isOutOfStock
                    ? 'bg-gray-100 cursor-not-allowed opacity-75 border-gray-300'
                    : 'bg-white cursor-pointer hover:shadow-2xl border-transparent hover:border-[#918172]'
            }`}
        >
            {/* Image Container - With Max Height */}
            <div 
                className={`relative overflow-hidden flex items-center justify-center ${
                    isOutOfStock
                        ? 'bg-gradient-to-br from-gray-200 to-gray-300'
                        : 'bg-gradient-to-br from-[#F5F5F5] to-[#EEEEEE]'
                }`}
                style={{ minHeight: '280px', maxHeight: '400px' }}
            >
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className={`w-full h-auto max-h-[400px] object-contain transition-transform duration-500 ${
                        isOutOfStock
                            ? 'grayscale opacity-60'
                            : 'group-hover:scale-105'
                    }`}
                />

                {/* Hover Overlay */}
                {!isOutOfStock && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}

                {/* Out of Stock Badge */}
                {isOutOfStock && (
                    <div className="absolute top-3 left-3 bg-gray-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                        <Package className="w-3 h-3" />
                        <span>Out of Stock</span>
                    </div>
                )}

                {/* Heart Icon - Top Right - Only show if in stock */}
                {!isOutOfStock && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-[#918172] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Heart className="w-4 h-4 text-[#8B5A3C] group-hover:fill-[#8B5A3C] transition-all" />
                    </div>
                )}

                {/* Price Badge */}
                <div 
                    className={`absolute bottom-3 left-3 rounded-xl px-3 py-2 shadow-xl z-10 ${
                        isOutOfStock
                            ? 'bg-gray-300/95 backdrop-blur-sm border border-gray-400'
                            : 'bg-white/95 backdrop-blur-sm border border-[#D4A798]'
                    }`}
                >
                    <div className="flex flex-col">
                        <span 
                            className={`text-xs line-through leading-tight ${
                                isOutOfStock ? 'text-gray-500' : 'text-[#8B5A3C]'
                            }`}
                        >
                            {formatPrice(product.price + 10)}
                        </span>
                        <span 
                            className={`text-lg font-black leading-tight ${
                                isOutOfStock
                                    ? 'text-gray-600'
                                    : 'bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent'
                            }`}
                        >
                            {formatPrice(product.price)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {product.category && (
                    <div className="flex items-center gap-1.5 mb-2">
                        <PawPrint 
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                                isOutOfStock ? 'text-gray-400' : 'text-[#8B5A3C]'
                            }`} 
                        />
                        <span 
                            className={`text-xs sm:text-sm font-semibold truncate ${
                                isOutOfStock ? 'text-gray-500' : 'text-[#6D4C41]'
                            }`}
                        >
                            {product.category}
                        </span>
                    </div>
                )}
                
                <h3 
                    className={`text-base md:text-lg font-bold transition-colors line-clamp-2 leading-tight mb-2 min-h-[2.5rem] ${
                        isOutOfStock
                            ? 'text-gray-600'
                            : 'text-[#5D4037] group-hover:text-[#8B5A3C]'
                    }`} 
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    {product.title}
                </h3>
                
                <p 
                    className={`text-sm line-clamp-2 mb-3 ${
                        isOutOfStock ? 'text-gray-500' : 'text-[#6D4C41]'
                    }`}
                >
                    {product.description}
                </p>
                
                <button
                    disabled={isOutOfStock}
                    className={`w-full font-bold text-sm py-2.5 rounded-lg transition-all duration-300 border-2 shadow-sm flex items-center justify-center gap-2 ${
                        isOutOfStock
                            ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#F5EDE4] to-[#F8F4ED] group-hover:from-[#D4A798] group-hover:to-[#C19A8B] text-[#5D4037] group-hover:text-white border-[#918172] group-hover:border-transparent group-hover:shadow-md'
                    }`}
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Out of Stock' : 'View Product'}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;