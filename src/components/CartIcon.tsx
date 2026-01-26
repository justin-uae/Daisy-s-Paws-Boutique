import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/Cartcontext';

export default function CartIcon() {
    const { cartCount } = useCart();

    return (
        <Link
            to="/cart"
            className="relative p-2 hover:bg-stone-50 rounded-xl transition-all group"
            aria-label={`Shopping cart with ${cartCount} items`}
        >
            <ShoppingCart className="w-6 h-6 text-stone-700 group-hover:text-stone-900 transition-colors" />

            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-stone-700 to-stone-800 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </Link>
    );
}