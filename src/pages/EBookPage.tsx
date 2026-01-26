import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, CheckCircle, Download, Sparkles, ChevronDown, ChevronUp, Info, Award, Users } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllProducts } from '../slices/productsSlice';

export default function EBookPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { products, loading } = useAppSelector((state) => state.products);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(true);
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    // Fetch products on mount
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, products.length]);

    // Get first E-Book category product
    const ebook = products.find(
        (product) => product.category && product.category.toLowerCase() === 'e-books'
    );

    const handleWhatsAppPurchase = () => {
        if (!ebook) return;

        const phoneNumber = '+971545613397';
        const message = `Peace be upon you,

I would like to purchase this E-Book:

📚 *${ebook.title}*

*Product Details:*
💰 Price: AED ${ebook.price.toFixed(2)}
${ebook.originalPrice ? `~~Was: AED ${ebook.originalPrice.toFixed(2)}~~` : ''}
📂 Category: ${ebook.category}

${ebook.features && ebook.features.length > 0 ? `\n*Key Features:*\n${ebook.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}\n` : ''}
Please provide payment details and download instructions.

JazakAllah Khair!`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const formatPrice = (price: number) => {
        return `AED ${price.toFixed(2)}`;
    };

    const discountPercentage = ebook?.originalPrice
        ? Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100)
        : 0;

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!ebook) {
        return <NoEBookState navigate={navigate} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
            {/* Breadcrumb */}
            <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <button onClick={() => navigate('/')} className="hover:text-amber-700 font-medium transition-colors">
                            Home
                        </button>
                        <span className="text-amber-400">→</span>
                        <button onClick={() => navigate('/products?category=E-Books')} className="hover:text-amber-700 font-medium transition-colors">
                            E-Books
                        </button>
                        <span className="text-amber-400">→</span>
                        <span className="text-gray-900 font-semibold truncate">{ebook.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Main Image */}
                        {ebook.images && ebook.images.length > 0 && (
                            <div className="relative">
                                <div className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100">
                                    <img
                                        src={ebook.images[currentImageIndex] || ebook.images[0]}
                                        alt={ebook.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                    {/* Bestseller Badge */}
                                    {ebook.rating >= 4.5 && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            <span className="font-bold text-sm">Bestseller</span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {ebook.images.length > 1 && (
                                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                        {ebook.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 ${index === currentImageIndex
                                                    ? 'border-amber-600 ring-2 ring-amber-300'
                                                    : 'border-amber-200 opacity-60 hover:opacity-100'
                                                    } transition-all`}
                                            >
                                                <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Title & Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1.5 rounded-full mb-4 border border-amber-200">
                                <BookOpen className="w-4 h-4 text-amber-700" />
                                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    {ebook.category || 'Digital E-Book'}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                {ebook.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                {ebook.rating > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                                        <span className="font-bold text-gray-900">{ebook.rating.toFixed(1)}</span>
                                        {ebook.reviewsCount > 0 && (
                                            <span className="font-medium">({ebook.reviewsCount.toLocaleString()} reviews)</span>
                                        )}
                                    </div>
                                )}
                                {ebook.reviewsCount > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-amber-700" />
                                        <span className="font-semibold">{ebook.reviewsCount.toLocaleString()}+ Downloads</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Key Features */}
                        {ebook.features && ebook.features.length > 0 && (
                            <AccordionSection
                                title="Key Features"
                                isOpen={isFeaturesOpen}
                                setIsOpen={setIsFeaturesOpen}
                                icon={<Award className="w-6 h-6 text-white" />}
                            >
                                <div className="space-y-3">
                                    {ebook.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border-2 border-amber-200 hover:bg-amber-100 transition-colors"
                                        >
                                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-800 font-semibold text-sm sm:text-base">{feature}</span>
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
                            icon={<Info className="w-6 h-6 text-white" />}
                        >
                            <FAQItem
                                question="How will I receive the e-book?"
                                answer="After purchase confirmation via WhatsApp, you'll receive a secure download link directly to your email and WhatsApp. You can download the file and access it on any device."
                            />
                            <FAQItem
                                question="Can I print the e-book?"
                                answer="Yes! The format allows you to print the entire guide or specific sections for your personal use during your Umrah journey."
                            />
                            <FAQItem
                                question="Is this suitable for first-time pilgrims?"
                                answer="Absolutely! This guide is specifically designed for both first-time pilgrims and those returning to perform Umrah again, with clear step-by-step instructions."
                            />
                            <FAQItem
                                question="What payment methods do you accept?"
                                answer="We accept various payment methods including bank transfer, credit/debit cards. Contact us via WhatsApp to complete your purchase securely."
                            />
                        </AccordionSection>
                    </div>

                    {/* Right Column - Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-base text-gray-500 line-through font-medium">
                                            {formatPrice(ebook.price + 50)}
                                        </span>
                                        {discountPercentage > 0 && (
                                            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                {discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-5xl font-black bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                                        {formatPrice(ebook.price)}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 font-medium">One-time payment • Lifetime access</p>
                                </div>

                                {/* What's Included */}
                                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 mb-6 border-2 border-amber-200">
                                    <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                                        <Download className="w-5 h-5 text-amber-700" />
                                        What's Included:
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        {ebook.features && ebook.features.length > 0 ? (
                                            ebook.features.slice(0, 5).map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">Complete digital guide</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">Instant download access</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">Lifetime free updates</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">24/7 customer support</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                                {/* WhatsApp Purchase Button */}
                                <button
                                    onClick={handleWhatsAppPurchase}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
                                >
                                    <FaWhatsapp className="w-6 h-6" />
                                    Purchase via WhatsApp
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-4 font-medium">
                                    Secure payment • Instant delivery • Money-back guarantee
                                </p>
                            </div>

                            {/* Trust Badges */}
                            {(ebook.rating > 0 || ebook.reviewsCount > 0) && (
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {ebook.rating > 0 && (
                                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 text-center border-2 border-amber-200">
                                            <div className="text-3xl font-black text-amber-700 mb-1">
                                                {ebook.rating.toFixed(1)}
                                            </div>
                                            <p className="text-xs font-bold text-gray-700">Average Rating</p>
                                        </div>
                                    )}
                                    {ebook.reviewsCount > 0 && (
                                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 text-center border-2 border-amber-200">
                                            <div className="text-3xl font-black text-amber-700 mb-1">
                                                {ebook.reviewsCount >= 1000
                                                    ? `${(ebook.reviewsCount / 1000).toFixed(1)}K+`
                                                    : `${ebook.reviewsCount}+`}
                                            </div>
                                            <p className="text-xs font-bold text-gray-700">Happy Pilgrims</p>
                                        </div>
                                    )}
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
    <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-100 overflow-hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-amber-50 transition-colors"
        >
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-xl flex items-center justify-center">
                    {icon}
                </div>
                <span>{title}</span>
            </h2>
            {isOpen ? (
                <ChevronUp className="w-6 h-6 text-gray-600 flex-shrink-0" />
            ) : (
                <ChevronDown className="w-6 h-6 text-gray-600 flex-shrink-0" />
            )}
        </button>
        {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
);

const FAQItem = ({ question, answer }: any) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0">
        <h3 className="font-bold text-gray-900 mb-2 text-sm">{question}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{answer}</p>
    </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white">
        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="h-4 w-96 bg-amber-200 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-[16/10] bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl animate-pulse"></div>
                    <div className="bg-white rounded-2xl p-6 border-2 border-amber-100">
                        <div className="h-8 w-3/4 bg-amber-200 rounded mb-4 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 border-2 border-amber-200">
                        <div className="h-12 w-32 bg-amber-200 rounded mb-6 animate-pulse"></div>
                        <div className="h-10 w-full bg-amber-100 rounded mb-6 animate-pulse"></div>
                        <div className="h-16 w-full bg-green-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// No E-Book State
const NoEBookState = ({ navigate }: any) => (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/10 to-white flex items-center justify-center">
        <div className="text-center px-4">
            <BookOpen className="w-24 h-24 text-amber-200 mx-auto mb-6" />
            <h1 className="text-3xl font-black text-gray-900 mb-4">No E-Books Available</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                We don't have any e-books in our catalog yet. Please check back later or browse our other products.
            </p>
            <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
                Browse All Products
            </button>
        </div>
    </div>
);