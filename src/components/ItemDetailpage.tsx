import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Check, ChevronUp, ChevronDown, HelpCircle, Star, Package, PawPrint, ShoppingCart, Ruler } from 'lucide-react';
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
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<{
        id: string;
        title: string;
        price: number;
        availableForSale: boolean;
    } | null>(null);
    const { formatPrice } = useCurrency();

    // Accordion states
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(true);
    const [isSizeInfoOpen, setIsSizeInfoOpen] = useState(false);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Modal states
    const [showHowToMeasure, setShowHowToMeasure] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

    // Fetch product on mount
    useEffect(() => {
        if (id) {
            const shopifyId = `gid://shopify/Product/${id}`;
            dispatch(fetchProductById(shopifyId));
        }
    }, [id, dispatch]);

    useEffect(() => {
        // Set the first available variant as default if variants exist
        if (selectedProduct?.variants && selectedProduct.variants.length > 0) {
            setSelectedVariant(selectedProduct.variants[0]);
        } else {
            setSelectedVariant(null);
        }
    }, [selectedProduct?.id]);

    const isBundle = selectedProduct?.category?.toLowerCase() === 'bundle';

    const handleAddToCart = async () => {
        if (!selectedProduct) return;

        // Validate variant selection if product has multiple variants
        if (hasVariants && !selectedVariant) {
            toast.error('Please select a variant before adding to cart', {
                duration: 3000,
                style: {
                    background: '#dc2626',
                    color: 'white',
                    fontWeight: 'bold',
                },
            });
            return;
        }

        // Check if selected variant is available for sale
        if (selectedVariant && !selectedVariant.availableForSale) {
            toast.error('This variant is currently out of stock', {
                duration: 3000,
                style: {
                    background: '#dc2626',
                    color: 'white',
                    fontWeight: 'bold',
                },
            });
            return;
        }

        try {
            const variantId = selectedVariant?.id || selectedProduct.variants[0]?.id;
            const variantTitle = selectedVariant?.title !== 'Default Title' ? selectedVariant?.title : undefined;

            await addToCart({
                variantId: variantId,
                quantity: quantity,
                title: selectedProduct.title,
                price: selectedVariant?.price || selectedProduct.price,
                image: selectedProduct.images?.[0],
                productId: selectedProduct.id,
                ...(variantTitle && { size: variantTitle }), // Only include size if variant has a meaningful title
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

        // Validate variant selection if product has multiple variants
        if (hasVariants && !selectedVariant) {
            toast.error('Please select a variant before inquiring', {
                duration: 3000,
                style: {
                    background: '#dc2626',
                    color: 'white',
                    fontWeight: 'bold',
                },
            });
            return;
        }

        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
        const price = selectedVariant?.price || selectedProduct.price;
        const subtotal = formatPrice(price * quantity);
        const variantInfo = selectedVariant && selectedVariant.title !== 'Default Title'
            ? ` Size/Variant: ${selectedVariant.title}\n`
            : '';

        const message = `Hello! 🐾

I'm interested in purchasing:

🐕 *${selectedProduct.title}*
 Category: ${selectedProduct.category || 'Dog Fashion'}
${isBundle ? 'Bundle Product - 10% Discount Applied!' : ''}

*Product Details:*
 Quantity: ${quantity}
${variantInfo} Price per unit: ${formatPrice(price)}
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

    const subtotal = formatPrice((selectedVariant?.price || selectedProduct.price) * quantity);
    const hasVariants = selectedProduct.variants && selectedProduct.variants.length > 1;
    const hasSizeInfo = selectedProduct.howToMeasureImage || selectedProduct.sizeChartImage;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
            {/* Paw prints in background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <PawPrint className="absolute top-20 left-20 w-24 h-24 sm:w-32 sm:h-32 text-[#59514F] animate-pulse" />
                <PawPrint className="absolute bottom-20 right-20 w-32 h-32 sm:w-40 sm:h-40 text-[#59514F] animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>

            {/* Breadcrumb */}
            <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-[#6D4C41] overflow-x-auto whitespace-nowrap">
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
                        <span className="text-[#5D4037] font-semibold truncate max-w-[150px] sm:max-w-none">{selectedProduct.title}</span>
                    </div>
                </div>
            </div>

            {/* Bundle Discount Banner */}
            {isBundle && (
                <div className="bg-gradient-to-r from-[#D4A798] via-[#C19A8B] to-[#D4A798] py-2 sm:py-3 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)`
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-white text-center">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                                <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wide">
                                    Bundle Deal:
                                </span>
                            </div>
                            <span className="text-xs sm:text-sm md:text-base font-bold">
                                Save 10% on All Items in This Package!
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        {/* Image Gallery */}
                        {selectedProduct.images && selectedProduct.images.length > 0 && (
                            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl border border-[#DED8D6] sm:border-2 bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6]">
                                <img
                                    src={selectedProduct.images[0] || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800'}
                                    alt={selectedProduct.title}
                                    className="w-full h-auto max-h-[350px] sm:max-h-[500px] md:max-h-[600px] object-contain mx-auto"
                                />
                            </div>
                        )}
                        {/* Title & Details */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-[#DED8D6] sm:border-2">
                            <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#5D4037] mb-2 sm:mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                                        {selectedProduct.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#6D4C41]">
                                        {selectedProduct.category && (
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <BiCategory className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A3C] flex-shrink-0" />
                                                <span className="truncate font-semibold">{selectedProduct.category}</span>
                                            </div>
                                        )}
                                        {selectedProduct.rating > 0 && (
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#8B5A3C] text-[#8B5A3C] flex-shrink-0" />
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
                                <div className="mt-2 sm:mt-3 bg-gradient-to-r from-[#EBEAE9] to-[#DED8D6] border border-[#D4A798] sm:border-2 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-[#5D4037] mb-0.5 text-xs sm:text-sm">Special Bundle Savings!</h4>
                                            <p className="text-[10px] sm:text-xs text-[#6D4C41] font-semibold leading-relaxed">
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
                            icon={<PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5A3C]" />}
                        >
                            {selectedProduct.descriptionHtml ? (
                                <div
                                    className="text-xs sm:text-sm md:text-base text-[#6D4C41] leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedProduct.descriptionHtml }}
                                />
                            ) : (
                                <p className="text-xs sm:text-sm md:text-base text-[#6D4C41] leading-relaxed">
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
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D4A798] to-[#C19A8B] rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                }
                            >
                                <div className="space-y-2 sm:space-y-3">
                                    {selectedProduct.features.map((feature: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#EBEAE9] rounded-lg sm:rounded-xl border border-[#DED8D6] sm:border-2 hover:bg-[#DED8D6]/50 transition-colors"
                                        >
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </div>
                                            <span className="text-[#5D4037] font-semibold text-xs sm:text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </AccordionSection>
                        )}

                        {/* Size Information - Accordion */}
                        {hasSizeInfo && (
                            <AccordionSection
                                title="Size Information"
                                isOpen={isSizeInfoOpen}
                                setIsOpen={setIsSizeInfoOpen}
                                icon={
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D4A798] to-[#C19A8B] rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                }
                            >
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Available Sizes from Variants */}
                                    {hasVariants && (
                                        <div>
                                            <h3 className="font-bold text-[#5D4037] mb-2 sm:mb-3 text-xs sm:text-sm">Available Sizes</h3>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {selectedProduct.variants
                                                    .filter(v => v.title !== 'Default Title')
                                                    .map((variant, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#EBEAE9] rounded-lg sm:rounded-xl border border-[#D4A798] sm:border-2 text-[#5D4037] font-bold text-xs sm:text-sm hover:bg-[#DED8D6] transition-colors"
                                                        >
                                                            {variant.title}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* How to Measure Guide */}
                                    {selectedProduct.howToMeasureImage && (
                                        <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#DED8D6] sm:border-2">
                                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[#5D4037] text-xs sm:text-sm mb-0.5 sm:mb-1">How to Measure Your Pup</h4>
                                                    <p className="text-[10px] sm:text-xs text-[#6D4C41] font-semibold">Follow this guide to get the perfect fit</p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-1.5 sm:p-2">
                                                <img
                                                    src={selectedProduct.howToMeasureImage}
                                                    alt="How to Measure Guide"
                                                    className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                                                    onClick={() => setShowHowToMeasure(true)}
                                                />
                                            </div>
                                            <p className="text-[10px] sm:text-xs text-[#6D4C41] mt-2 sm:mt-3 text-center font-medium">
                                                Click image to view full size
                                            </p>
                                        </div>
                                    )}

                                    {/* Size Chart */}
                                    {selectedProduct.sizeChartImage && (
                                        <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#DED8D6] sm:border-2">
                                            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8B5A3C] rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[#5D4037] text-xs sm:text-sm mb-0.5 sm:mb-1">Size Chart</h4>
                                                    <p className="text-[10px] sm:text-xs text-[#6D4C41] font-semibold">Find your pup's perfect size</p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-1.5 sm:p-2">
                                                <img
                                                    src={selectedProduct.sizeChartImage}
                                                    alt="Size Chart"
                                                    className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                                                    onClick={() => setShowSizeChart(true)}
                                                />
                                            </div>
                                            <p className="text-[10px] sm:text-xs text-[#6D4C41] mt-2 sm:mt-3 text-center font-medium">
                                                Click image to view full size
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </AccordionSection>
                        )}

                        {/* Image Modals */}
                        {showHowToMeasure && selectedProduct.howToMeasureImage && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowHowToMeasure(false)}>
                                <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setShowHowToMeasure(false)}
                                        className="absolute -top-10 sm:-top-12 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-[#EBEAE9] text-[#5D4037] rounded-full flex items-center justify-center transition-colors shadow-lg z-10 font-bold text-lg sm:text-xl"
                                    >
                                        ✕
                                    </button>
                                    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl">
                                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-[#5D4037] mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                            How to Measure Your Pup
                                        </h3>
                                        <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-xl sm:rounded-2xl p-2 sm:p-3">
                                            <img
                                                src={selectedProduct.howToMeasureImage}
                                                alt="How to Measure Guide"
                                                className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showSizeChart && selectedProduct.sizeChartImage && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowSizeChart(false)}>
                                <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setShowSizeChart(false)}
                                        className="absolute -top-10 sm:-top-12 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-[#EBEAE9] text-[#5D4037] rounded-full flex items-center justify-center transition-colors shadow-lg z-10 font-bold text-lg sm:text-xl"
                                    >
                                        ✕
                                    </button>
                                    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl">
                                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-[#5D4037] mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                            Size Chart
                                        </h3>
                                        <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-xl sm:rounded-2xl p-2 sm:p-3">
                                            <img
                                                src={selectedProduct.sizeChartImage}
                                                alt="Size Chart"
                                                className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* FAQ */}
                        <AccordionSection
                            title="Frequently Asked Questions"
                            isOpen={isFaqOpen}
                            setIsOpen={setIsFaqOpen}
                            icon={
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D4A798] to-[#C19A8B] rounded-lg sm:rounded-xl flex items-center justify-center">
                                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
                            {hasVariants && (
                                <FAQItem
                                    question="How do I choose the right size for my dog?"
                                    answer="Refer to our size chart above and measure your dog according to the 'How to Measure' guide. If you're unsure between sizes, we recommend choosing the larger size for comfort."
                                />
                            )}
                        </AccordionSection>
                    </div>

                    {/* Right Column - Purchase */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <div className="bg-white border border-[#DED8D6] sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl">
                                {/* Paw print decoration */}
                                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 opacity-20">
                                    <PawPrint className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4A798]" />
                                </div>

                                {/* Bundle Badge */}
                                {isBundle && (
                                    <div className="mb-3 sm:mb-4 bg-gradient-to-r from-[#D4A798] to-[#C19A8B] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center">
                                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                                            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="font-black text-xs sm:text-sm uppercase tracking-wider">Bundle Deal Active</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs font-semibold">10% Discount Applied!</p>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="mb-4 sm:mb-6">
                                    {selectedProduct.price && (
                                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                                            <span className="text-xs sm:text-sm text-[#8B5A3C] line-through font-medium">
                                                {formatPrice((selectedVariant?.price || selectedProduct.price) + 10)}
                                            </span>
                                            {isBundle && (
                                                <span className="bg-[#8B5A3C] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                                    -10%
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent">
                                        {formatPrice(selectedVariant?.price || selectedProduct.price)}
                                    </div>
                                    {isBundle && (
                                        <p className="text-[10px] sm:text-xs text-[#8B5A3C] font-bold mt-0.5 sm:mt-1">Bundle discount already included!</p>
                                    )}
                                </div>

                                {/* Variant Selection - Only show if product has multiple variants */}
                                {hasVariants && (
                                    <div className="mb-4 sm:mb-6">
                                        <label className="block text-xs sm:text-sm font-bold text-[#5D4037] mb-1.5 sm:mb-2">
                                            Select Variant <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                                            {selectedProduct.variants
                                                .filter(v => v.title !== 'Default Title')
                                                .map((variant, index: number) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedVariant(variant)}
                                                        disabled={!variant.availableForSale}
                                                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all border-2 relative ${selectedVariant?.id === variant.id
                                                            ? 'bg-[#8B5A3C] text-white border-[#8B5A3C] scale-105 shadow-lg'
                                                            : variant.availableForSale
                                                                ? 'bg-[#EBEAE9] text-[#5D4037] border-[#DED8D6] hover:border-[#D4A798] hover:bg-[#DED8D6]'
                                                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                                                            }`}
                                                    >
                                                        {variant.title}
                                                        {!variant.availableForSale && (
                                                            <span className="absolute top-0 right-0 -mt-1 -mr-1 text-[8px] sm:text-[9px] bg-red-500 text-white px-1 py-0.5 rounded-full">
                                                                Out
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                        </div>
                                        {!selectedVariant && (
                                            <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 sm:mt-2 font-semibold">
                                                Please select a variant before adding to cart
                                            </p>
                                        )}
                                        {selectedVariant && !selectedVariant.availableForSale && (
                                            <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 sm:mt-2 font-semibold">
                                                This variant is currently out of stock
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Quantity */}
                                <div className="mb-4 sm:mb-6">
                                    <label className="block text-xs sm:text-sm font-bold text-[#5D4037] mb-1.5 sm:mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center border border-[#DED8D6] sm:border-2 rounded-lg sm:rounded-xl overflow-hidden hover:border-[#D4A798] transition-colors">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#EBEAE9] transition-colors font-bold text-[#6D4C41] text-sm sm:text-base"
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center font-bold text-[#5D4037] text-base sm:text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#EBEAE9] transition-colors font-bold text-[#6D4C41] text-sm sm:text-base"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#D4A798] sm:border-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base sm:text-lg font-black text-[#5D4037]">Total</span>
                                        <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent">
                                            {subtotal}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2 sm:space-y-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={cartLoading}
                                        className="w-full bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] hover:from-[#6D4C41] hover:to-[#8B5A3C] text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 shadow-lg sm:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        {cartLoading ? (
                                            'Adding...'
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[#DED8D6]"></div>
                                        </div>
                                        <div className="relative flex justify-center text-[10px] sm:text-xs">
                                            <span className="px-2 bg-white text-[#6D4C41] font-semibold">or</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppInquiry}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 shadow-lg sm:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        Inquire on WhatsApp
                                        <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>

                                {/* Info Text */}
                                <p className="text-[10px] sm:text-xs text-center text-[#6D4C41] mt-3 sm:mt-4 leading-relaxed">
                                    Secure checkout powered by Shopify
                                </p>
                            </div>

                            {/* Trust Badge */}
                            {selectedProduct.rating > 0 && (
                                <div className="mt-4 sm:mt-6 bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#D4A798] sm:border-2 shadow-lg">
                                    <div className="text-center">
                                        <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] bg-clip-text text-transparent mb-1.5 sm:mb-2">
                                            {selectedProduct.rating.toFixed(1)}/5
                                        </div>
                                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-[#8B5A3C] text-[#8B5A3C]' : 'text-[#DED8D6]'}`}
                                                />
                                            ))}
                                        </div>
                                        {selectedProduct.reviewsCount > 0 && (
                                            <div className="text-xs sm:text-sm text-[#6D4C41] font-semibold">
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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#DED8D6] sm:border-2 overflow-hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-[#EBEAE9] transition-colors"
        >
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[#5D4037] flex items-center gap-2 sm:gap-3" style={{ fontFamily: 'Georgia, serif' }}>
                {icon}
                <span>{title}</span>
            </h2>
            {isOpen ? <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#6D4C41] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#6D4C41] flex-shrink-0" />}
        </button>
        {isOpen && <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>}
    </div>
);

const FAQItem = ({ question, answer }: any) => (
    <div className="border-b border-[#DED8D6] pb-3 sm:pb-4 mb-3 sm:mb-4 last:border-0 last:mb-0">
        <h3 className="font-bold text-[#5D4037] mb-1.5 sm:mb-2 text-xs sm:text-sm">{question}</h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-[#6D4C41] leading-relaxed">{answer}</p>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4ED] via-white to-[#F8F4ED]">
        <div className="border-b border-[#DED8D6] bg-gradient-to-r from-[#F8F4ED]/50 to-[#EBEAE9]/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                <div className="h-3 sm:h-4 w-64 sm:w-96 bg-[#DED8D6] rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
                <div className="lg:col-span-2 space-y-4 sm:space-y-8">
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#EBEAE9] to-[#DED8D6] rounded-2xl sm:rounded-3xl animate-pulse"></div>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#DED8D6] sm:border-2">
                        <div className="h-6 sm:h-8 w-3/4 bg-[#DED8D6] rounded mb-3 sm:mb-4 animate-pulse"></div>
                        <div className="h-3 sm:h-4 w-1/2 bg-[#D4A798] rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#DED8D6] sm:border-2">
                        <div className="h-10 sm:h-12 w-24 sm:w-32 bg-[#DED8D6] rounded mb-4 sm:mb-6 animate-pulse"></div>
                        <div className="h-8 sm:h-10 w-full bg-[#EBEAE9] rounded mb-4 sm:mb-6 animate-pulse"></div>
                        <div className="h-12 sm:h-16 w-full bg-[#D4A798] rounded animate-pulse"></div>
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
            <PawPrint className="w-24 h-24 sm:w-32 sm:h-32 text-[#DED8D6] mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#5D4037] mb-3 sm:mb-4" style={{ fontFamily: 'Georgia, serif' }}>Product Not Found</h1>
            <p className="text-sm sm:text-base text-[#6D4C41] mb-6 sm:mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link
                to="/products"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D4A798] via-[#C19A8B] to-[#D4A798] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
            >
                Browse All Products
            </Link>
        </div>
    </div>
);