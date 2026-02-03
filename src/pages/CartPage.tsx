import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, PawPrint } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import { useCart } from '../context/Cartcontext';

export default function CartPage() {
    const { cart, cartCount, checkout, loading, removeFromCart, updateQuantity, clearCart, proceedToCheckout } = useCart();
    const { formatPrice } = useCurrency();

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (cartCount === 0) {
        return <EmptyCart />;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
            {/* Paw prints background */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <PawPrint className="absolute top-20 left-20 w-32 h-32 text-[#59514F] animate-pulse" />
                <PawPrint className="absolute bottom-20 right-20 w-40 h-40 text-[#59514F] animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>

            {/* Header */}
            <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#5D4037] mb-1 sm:mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                Shopping Cart
                            </h1>
                            <p className="text-sm sm:text-base text-[#6D4C41] font-semibold">
                                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#D4A798] to-[#C19A8B] text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:scale-105 text-center"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                        {cart.map((item) => (
                            <div
                                key={`${item.variantId}-${item.size || 'no-size'}`}
                                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-[#DED8D6] hover:border-[#D4A798] transition-all"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                    {/* Image */}
                                    {item.image && (
                                        <div className="w-full sm:w-24 lg:w-32 h-24 sm:h-24 lg:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                    )}

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-black text-[#5D4037] line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                {/* Display Size if available */}
                                                {item.size && (
                                                    <p className="text-xs sm:text-sm text-[#8B5A3C] font-bold mt-1">
                                                        Size: {item.size}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.variantId, item.size)}
                                                className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 flex-shrink-0"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border-2 border-[#DED8D6] rounded-lg sm:rounded-xl overflow-hidden w-fit">
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity - 1, item.size)}
                                                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-[#EBEAE9] transition-colors"
                                                    disabled={loading}
                                                >
                                                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D4C41]" />
                                                </button>
                                                <span className="px-3 sm:px-4 py-1.5 sm:py-2 font-bold text-sm sm:text-base text-[#5D4037] min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity + 1, item.size)}
                                                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-[#EBEAE9] transition-colors"
                                                    disabled={loading}
                                                >
                                                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D4C41]" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-left sm:text-right">
                                                <div className="text-xs sm:text-sm text-[#8B5A3C] font-medium mb-0.5 sm:mb-1">
                                                    {formatPrice(item.price)} each
                                                </div>
                                                <div className="text-lg sm:text-xl font-black text-[#5D4037]">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <button
                            onClick={clearCart}
                            className="w-full py-2.5 sm:py-3 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl font-bold transition-colors border-2 border-red-200 hover:border-red-300"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-8">
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl border-2 border-[#DED8D6]">
                                <h2 className="text-xl sm:text-2xl font-black text-[#5D4037] mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                    Order Summary
                                </h2>

                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                    <div className="flex items-center justify-between text-[#6D4C41]">
                                        <span className="font-semibold text-sm sm:text-base">Subtotal</span>
                                        <span className="font-bold text-sm sm:text-base">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="border-t-2 border-[#DED8D6] pt-3 sm:pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg sm:text-xl font-black text-[#5D4037]">Total</span>
                                            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={proceedToCheckout}
                                    disabled={loading || !checkout}
                                    className="w-full bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] hover:from-[#6D4C41] hover:to-[#8B5A3C] text-white font-bold py-3 sm:py-4 rounded-xl text-sm sm:text-base transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            Proceed to Checkout
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-[10px] sm:text-xs text-center text-[#6D4C41] mt-3 sm:mt-4 leading-relaxed">
                                    You'll be redirected to Shopify's secure checkout
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-4 sm:mt-6 bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-[#D4A798]">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 sm:gap-3 text-[#5D4037]">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-xs sm:text-sm">Secure Checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 text-[#5D4037]">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-xs sm:text-sm">Fast Shipping</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Empty Cart State
const EmptyCart = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED] flex items-center justify-center">
        <div className="text-center px-4">
            <div className="relative inline-block mb-4 sm:mb-6">
                <ShoppingBag className="w-24 h-24 sm:w-32 sm:h-32 text-[#DED8D6]" />
                <PawPrint className="w-12 h-12 sm:w-16 sm:h-16 text-[#D4A798] absolute -bottom-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#5D4037] mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Your Cart is Empty
            </h1>
            <p className="text-sm sm:text-base text-[#6D4C41] mb-6 sm:mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping for your furry friend!
            </p>
            <Link
                to="/products"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-[#D4A798] via-[#C19A8B] to-[#D4A798] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
                Start Shopping
            </Link>
        </div>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
        <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="h-8 sm:h-10 w-48 sm:w-64 bg-[#DED8D6] rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-[#DED8D6]">
                            <div className="flex gap-4 sm:gap-6">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#EBEAE9] rounded-lg sm:rounded-xl animate-pulse"></div>
                                <div className="flex-1 space-y-2 sm:space-y-3">
                                    <div className="h-5 sm:h-6 w-3/4 bg-[#DED8D6] rounded animate-pulse"></div>
                                    <div className="h-3 sm:h-4 w-1/2 bg-[#EBEAE9] rounded animate-pulse"></div>
                                    <div className="h-8 sm:h-10 w-24 sm:w-32 bg-[#DED8D6] rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-[#DED8D6]">
                        <div className="h-6 sm:h-8 w-36 sm:w-48 bg-[#DED8D6] rounded mb-4 sm:mb-6 animate-pulse"></div>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="h-5 sm:h-6 w-full bg-[#EBEAE9] rounded animate-pulse"></div>
                            <div className="h-5 sm:h-6 w-full bg-[#EBEAE9] rounded animate-pulse"></div>
                            <div className="h-10 sm:h-12 w-full bg-[#D4A798] rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);