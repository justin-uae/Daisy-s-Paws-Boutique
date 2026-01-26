import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Check, ChevronUp, ChevronDown, HelpCircle, Star, Package, PawPrint, ShoppingCart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProductById } from '../slices/productsSlice';
import { BiCategory } from 'react-icons/bi';
import { useCurrency } from '../hooks/useCurrency';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cartcontext';

export default function ItemDetailpage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedProduct, loading } = useAppSelector((state) => state.products);
    const { addToCart, loading: cartLoading } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { formatPrice } = useCurrency();

    // Accordion states
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(true);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Fetch product on mount
    useEffect(() => {
        if (id) {
            const shopifyId = `gid://shopify/Product/${id}`;
            dispatch(fetchProductById(shopifyId));
        }
    }, [id, dispatch]);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedProduct?.id]);

    const nextImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
        }
    };

    const prevImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
        }
    };

    const isBundle = selectedProduct?.category?.toLowerCase() === 'bundle';

    const handleAddToCart = async () => {
        if (!selectedProduct) return;

        try {
            await addToCart({
                variantId: selectedProduct.variantId,
                quantity: quantity,
                title: selectedProduct.title,
                price: selectedProduct.price,
                image: selectedProduct.images?.[0],
                productId: selectedProduct.id,
            });

            toast.success(
                <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Added to cart!</span>
                </div>,
                {
                    duration: 3000,
                    style: {
                        background: '#8B5A3C',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                }
            );
        } catch (error) {
            toast.error('Failed to add to cart. Please try again.', {
                duration: 3000,
            });
            console.error('Error adding to cart:', error);
        }
    };

    const handleWhatsAppInquiry = () => {
        if (!selectedProduct) return;

        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        const subtotal = formatPrice(selectedProduct.price * quantity);

        const message = `Hello! 🐾

I'm interested in purchasing:

🐕 *${selectedProduct.title}*
 Category: ${selectedProduct.category || 'Dog Fashion'}
${isBundle ? 'Bundle Product - 10% Discount Applied!' : ''}

*Product Details:*
 Quantity: ${quantity}
 Price per unit: ${formatPrice(selectedProduct.price)}
 Total Amount: ${subtotal}

${selectedProduct.features?.length > 0 ? `\n*Key Features:*\n${selectedProduct.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}\n` : ''}
Please provide payment details and delivery information.

Thank you! 🐶`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!selectedProduct) {
        return <NotFoundState />;
    }

    const subtotal = formatPrice(selectedProduct.price * quantity);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
            {/* Paw prints in background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <PawPrint className="absolute top-20 left-20 w-32 h-32 text-[#59514F] animate-pulse" />
                <PawPrint className="absolute bottom-20 right-20 w-40 h-40 text-[#59514F] animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>

            {/* Breadcrumb */}
            <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6D4C41] overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-[#8B5A3C] font-medium transition-colors">Home</Link>
                        <span className="text-[#D4A798]">→</span>
                        <Link to="/products" className="hover:text-[#8B5A3C] font-medium transition-colors">Products</Link>
                        <span className="text-[#D4A798]">→</span>
                        {selectedProduct.category && (
                            <>
                                <Link
                                    to={`/products?category=${selectedProduct.category}`}
                                    className="hover:text-[#8B5A3C] font-medium transition-colors"
                                >
                                    {selectedProduct.category}
                                </Link>
                                <span className="text-[#D4A798]">→</span>
                            </>
                        )}
                        <span className="text-[#5D4037] font-semibold truncate">{selectedProduct.title}</span>
                    </div>
                </div>
            </div>

            {/* Bundle Discount Banner - Only show for bundle products */}
            {isBundle && (
                <div className="bg-gradient-to-r from-[#D4A798] via-[#C19A8B] to-[#D4A798] py-2 sm:py-3 md:py-4 relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-white text-center">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce flex-shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black uppercase tracking-wide">
                                    Bundle Deal:
                                </span>
                            </div>
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
                                <span className="hidden md:inline">Save 10% on All Items in This Package!</span>
                                <span className="hidden sm:inline md:hidden">Save 10% on Bundle Package!</span>
                                <span className="sm:hidden">Save 10% on All Items in This Package!</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Image Gallery */}
                        {selectedProduct.images && selectedProduct.images.length > 0 && (
                            <div className="relative">
                                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DED8D6] bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6]">
                                    <img
                                        src={selectedProduct.images[currentImageIndex] || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800'}
                                        alt={selectedProduct.title}
                                        className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain mx-auto"
                                    />

                                    {selectedProduct.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5A3C]" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2 sm:p-2.5 rounded-full transition-all shadow-lg hover:scale-110"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5A3C]" />
                                            </button>

                                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                                                {currentImageIndex + 1} / {selectedProduct.images.length}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {selectedProduct.images.length > 1 && (
                                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                                        {selectedProduct.images.map((image: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 ${index === currentImageIndex
                                                    ? 'border-[#8B5A3C] ring-2 ring-[#D4A798]'
                                                    : 'border-[#DED8D6] opacity-60 hover:opacity-100 hover:border-[#D4A798]'
                                                    } transition-all bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6]`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Title & Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#DED8D6]">
                            <div className="flex items-start justify-between mb-4 gap-3">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#5D4037] mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                        {selectedProduct.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-[#6D4C41]">
                                        {selectedProduct.category && (
                                            <div className="flex items-center gap-2">
                                                <BiCategory className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5A3C] flex-shrink-0" />
                                                <span className="truncate font-semibold">{selectedProduct.category}</span>
                                            </div>
                                        )}
                                        {selectedProduct.rating > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#8B5A3C] text-[#8B5A3C] flex-shrink-0" />
                                                <span className="font-bold text-[#5D4037]">
                                                    {selectedProduct.rating.toFixed(1)}
                                                </span>
                                                {selectedProduct.reviewsCount > 0 && (
                                                    <span className="truncate font-medium">({selectedProduct.reviewsCount} reviews)</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bundle Savings Info Card */}
                            {isBundle && (
                                <div className="mt-3 sm:mt-4 bg-gradient-to-r from-[#EBEAE9] to-[#DED8D6] border-2 border-[#D4A798] rounded-xl p-3 sm:p-4">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-[#5D4037] mb-0.5 sm:mb-1 text-sm sm:text-base">Special Bundle Savings!</h4>
                                            <p className="text-xs sm:text-sm text-[#6D4C41] font-semibold leading-relaxed">
                                                Get 10% off when you order all products in this bundle together. Save money and get everything you need for your pup in one package!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Overview - Accordion */}
                        <AccordionSection
                            title="Product Overview"
                            isOpen={isOverviewOpen}
                            setIsOpen={setIsOverviewOpen}
                            icon={<PawPrint className="w-6 h-6 text-[#8B5A3C]" />}
                        >
                            {selectedProduct.descriptionHtml ? (
                                <div
                                    className="text-sm sm:text-base text-[#6D4C41] leading-relaxed prose prose-sm sm:prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedProduct.descriptionHtml }}
                                />
                            ) : (
                                <p className="text-sm sm:text-base text-[#6D4C41] leading-relaxed">
                                    {selectedProduct.description || "Premium dog fashion and accessories designed for comfort and style. Perfect for your furry friend!"}
                                </p>
                            )}
                        </AccordionSection>

                        {/* Features - Accordion */}
                        {selectedProduct.features && selectedProduct.features.length > 0 && (
                            <AccordionSection
                                title="Key Features"
                                isOpen={isFeaturesOpen}
                                setIsOpen={setIsFeaturesOpen}
                                icon={
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#D4A798] to-[#C19A8B] rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                }
                            >
                                <div className="space-y-3">
                                    {selectedProduct.features.map((feature: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-[#EBEAE9] rounded-xl border-2 border-[#DED8D6] hover:bg-[#DED8D6]/50 transition-colors"
                                        >
                                            <div className="w-6 h-6 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-[#5D4037] font-semibold text-sm sm:text-base">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </AccordionSection>
                        )}

                        {/* FAQ */}
                        <AccordionSection
                            title="Frequently Asked Questions"
                            isOpen={isFaqOpen}
                            setIsOpen={setIsFaqOpen}
                            icon={
                                <div className="w-10 h-10 bg-gradient-to-br from-[#D4A798] to-[#C19A8B] rounded-xl flex items-center justify-center">
                                    <HelpCircle className="w-6 h-6 text-white" />
                                </div>
                            }
                        >
                            <FAQItem
                                question="How do I complete my purchase?"
                                answer="You can add items to cart and proceed to checkout, or click 'Inquire on WhatsApp' to contact us directly for assistance."
                            />
                            <FAQItem
                                question="What payment methods do you accept?"
                                answer="We accept various payment methods including credit/debit cards, PayPal, and cash on delivery for eligible local orders."
                            />
                            <FAQItem
                                question="How long does delivery take?"
                                answer="Delivery times vary based on your location. We typically ship within 1-2 business days."
                            />
                            <FAQItem
                                question="Do you offer returns or exchanges?"
                                answer="Yes, we offer a 14-day return policy for unworn items with tags attached. Please contact us to initiate a return or exchange."
                            />
                            {isBundle && (
                                <FAQItem
                                    question="How does the bundle discount work?"
                                    answer="When you purchase this bundle, you automatically receive 10% off the total price compared to buying each item separately. The discount is already applied to the bundle price shown."
                                />
                            )}
                        </AccordionSection>
                    </div>

                    {/* Right Column - Purchase */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="bg-white border-2 border-[#DED8D6] rounded-3xl p-6 sm:p-8 shadow-2xl">
                                {/* Paw print decoration */}
                                <div className="absolute -top-3 -right-3 opacity-20">
                                    <PawPrint className="w-12 h-12 text-[#D4A798]" />
                                </div>

                                {/* Bundle Badge at top */}
                                {isBundle && (
                                    <div className="mb-4 bg-gradient-to-r from-[#D4A798] to-[#C19A8B] text-white px-4 py-3 rounded-xl text-center">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <Package className="w-5 h-5" />
                                            <span className="font-black text-sm uppercase tracking-wider">Bundle Deal Active</span>
                                        </div>
                                        <p className="text-xs font-semibold">10% Discount Applied!</p>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="mb-6">
                                    {selectedProduct.price && (
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-[#8B5A3C] line-through font-medium">
                                                {formatPrice(selectedProduct.price + 10)}
                                            </span>
                                            {isBundle && (
                                                <span className="bg-[#8B5A3C] text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    -10%
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent">
                                        {formatPrice(selectedProduct.price)}
                                    </div>
                                    {isBundle && (
                                        <p className="text-xs text-[#8B5A3C] font-bold mt-1">Bundle discount already included!</p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-[#5D4037] mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center border-2 border-[#DED8D6] rounded-xl overflow-hidden hover:border-[#D4A798] transition-colors">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-3 hover:bg-[#EBEAE9] transition-colors font-bold text-[#6D4C41]"
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center font-bold text-[#5D4037] text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-3 hover:bg-[#EBEAE9] transition-colors font-bold text-[#6D4C41]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-xl p-4 mb-6 border-2 border-[#D4A798]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-black text-[#5D4037]">Total</span>
                                        <span className="text-2xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent">
                                            {subtotal}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={cartLoading}
                                        className="w-full bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] hover:from-[#6D4C41] hover:to-[#8B5A3C] text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {cartLoading ? (
                                            'Adding...'
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[#DED8D6]"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 bg-white text-[#6D4C41] font-semibold">or</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppInquiry}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                    >
                                        Inquire on WhatsApp
                                        <FaWhatsapp className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Info Text */}
                                <p className="text-xs text-center text-[#6D4C41] mt-4 leading-relaxed">
                                    Secure checkout powered by Shopify
                                </p>
                            </div>

                            {/* Trust Badge */}
                            {selectedProduct.rating > 0 && (
                                <div className="mt-6 bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-2xl p-6 border-2 border-[#D4A798] shadow-lg">
                                    <div className="text-center">
                                        <div className="text-4xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent mb-2">
                                            {selectedProduct.rating.toFixed(1)}/5
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-[#8B5A3C] text-[#8B5A3C]' : 'text-[#DED8D6]'}`}
                                                />
                                            ))}
                                        </div>
                                        {selectedProduct.reviewsCount > 0 && (
                                            <div className="text-sm text-[#6D4C41] font-semibold">
                                                {selectedProduct.reviewsCount} verified reviews
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
const AccordionSection = ({ title, isOpen, setIsOpen, icon, children }: any) => (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#DED8D6] overflow-hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-[#EBEAE9] transition-colors"
        >
            <h2 className="text-xl sm:text-2xl font-black text-[#5D4037] flex items-center gap-3" style={{ fontFamily: 'Georgia, serif' }}>
                {icon}
                <span>{title}</span>
            </h2>
            {isOpen ? <ChevronUp className="w-6 h-6 text-[#6D4C41]" /> : <ChevronDown className="w-6 h-6 text-[#6D4C41]" />}
        </button>
        {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
);

const FAQItem = ({ question, answer }: any) => (
    <div className="border-b border-[#DED8D6] pb-4 mb-4 last:border-0 last:mb-0">
        <h3 className="font-bold text-[#5D4037] mb-2 text-sm">{question}</h3>
        <p className="text-sm text-[#6D4C41] leading-relaxed">{answer}</p>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
        <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="h-4 w-96 bg-[#DED8D6] rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-3xl animate-pulse"></div>
                    <div className="bg-white rounded-2xl p-6 border-2 border-[#DED8D6]">
                        <div className="h-8 w-3/4 bg-[#DED8D6] rounded mb-4 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-[#D4A798] rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 border-2 border-[#DED8D6]">
                        <div className="h-12 w-32 bg-[#DED8D6] rounded mb-6 animate-pulse"></div>
                        <div className="h-10 w-full bg-[#EBEAE9] rounded mb-6 animate-pulse"></div>
                        <div className="h-16 w-full bg-[#D4A798] rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Not Found State
const NotFoundState = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED] flex items-center justify-center">
        <div className="text-center px-4">
            <PawPrint className="w-32 h-32 text-[#DED8D6] mx-auto mb-4" />
            <h1 className="text-3xl font-black text-[#5D4037] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Product Not Found</h1>
            <p className="text-[#6D4C41] mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link
                to="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4A798] via-[#C19A8B] to-[#D4A798] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
                Browse All Products
            </Link>
        </div>
    </div>
);