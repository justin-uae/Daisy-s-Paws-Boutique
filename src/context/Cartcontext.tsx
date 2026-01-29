import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { createCart, replaceCartLines } from '../services/shopifyService';

// Types
interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
  productId: string;
  size?: string;
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: any[];
  totalPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  checkout: Cart | null;
  loading: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (variantId: string, size?: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number, size?: string) => Promise<void>;
  clearCart: () => void;
  proceedToCheckout: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCheckout = localStorage.getItem('checkout');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCheckout) {
      setCheckout(JSON.parse(savedCheckout));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart count (sum of all quantities)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Add item to cart
  const addToCart = async (item: CartItem): Promise<void> => {
    setLoading(true);

    try {
      // Check if item already exists in cart (same variant and same size)
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.variantId === item.variantId &&
          cartItem.size === item.size
      );

      let updatedCart: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity if item exists with same size
        updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        updatedCart = [...cart, item];
      }

      setCart(updatedCart);

      // Create or update Shopify cart
      const lineItems = updatedCart.map((cartItem) => {
        const attributes = [];

        // Add size attribute if present
        if (cartItem.size) {
          attributes.push({ key: 'Size', value: cartItem.size });
        }

        return {
          merchandiseId: cartItem.variantId,
          quantity: cartItem.quantity,
          attributes,
        };
      });

      let updatedCheckout;

      if (checkout?.id) {
        // Replace cart lines to avoid duplication
        try {
          updatedCheckout = await replaceCartLines(checkout.id, lineItems);
        } catch (error) {
          // If cart doesn't exist or expired, create new one
          console.log('Cart expired, creating new cart');
          updatedCheckout = await createCart(lineItems);
        }
      } else {
        // Create new cart
        updatedCheckout = await createCart(lineItems);
      }

      const checkoutData = {
        id: updatedCheckout.id,
        checkoutUrl: updatedCheckout.checkoutUrl,
        lines: updatedCheckout.lines,
        totalPrice: parseFloat(updatedCheckout.cost.totalAmount.amount),
      };

      setCheckout(checkoutData);
      localStorage.setItem('checkout', JSON.stringify(checkoutData));
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (variantId: string, size?: string): Promise<void> => {
    setLoading(true);

    try {
      const updatedCart = cart.filter((item) => {
        // If size is provided, match both variantId and size
        if (size !== undefined) {
          return !(item.variantId === variantId && item.size === size);
        }
        // If no size provided, match only variantId (for backwards compatibility)
        return item.variantId !== variantId;
      });

      setCart(updatedCart);

      // If cart is empty, clear checkout
      if (updatedCart.length === 0) {
        clearCart();
        return;
      }

      // Update Shopify cart
      if (checkout?.id) {
        const lineItems = updatedCart.map((cartItem) => {
          const attributes = [];

          if (cartItem.size) {
            attributes.push({ key: 'Size', value: cartItem.size });
          }

          return {
            merchandiseId: cartItem.variantId,
            quantity: cartItem.quantity,
            attributes,
          };
        });

        const updatedCheckout = await replaceCartLines(checkout.id, lineItems);
        const checkoutData = {
          id: updatedCheckout.id,
          checkoutUrl: updatedCheckout.checkoutUrl,
          lines: updatedCheckout.lines,
          totalPrice: parseFloat(updatedCheckout.cost.totalAmount.amount),
        };
        setCheckout(checkoutData);
        localStorage.setItem('checkout', JSON.stringify(checkoutData));
      }
    } catch (error) {
      console.error('Error updating cart after removal:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (variantId: string, quantity: number, size?: string): Promise<void> => {
    if (quantity <= 0) {
      await removeFromCart(variantId, size);
      return;
    }

    setLoading(true);

    try {
      const updatedCart = cart.map((item) => {
        // If size is provided, match both variantId and size
        if (size !== undefined) {
          return item.variantId === variantId && item.size === size
            ? { ...item, quantity }
            : item;
        }
        // If no size provided, match only variantId
        return item.variantId === variantId ? { ...item, quantity } : item;
      });

      setCart(updatedCart);

      // Update Shopify cart
      if (checkout?.id) {
        const lineItems = updatedCart.map((cartItem) => {
          const attributes = [];

          if (cartItem.size) {
            attributes.push({ key: 'Size', value: cartItem.size });
          }

          return {
            merchandiseId: cartItem.variantId,
            quantity: cartItem.quantity,
            attributes,
          };
        });

        const updatedCheckout = await replaceCartLines(checkout.id, lineItems);
        const checkoutData = {
          id: updatedCheckout.id,
          checkoutUrl: updatedCheckout.checkoutUrl,
          lines: updatedCheckout.lines,
          totalPrice: parseFloat(updatedCheckout.cost.totalAmount.amount),
        };
        setCheckout(checkoutData);
        localStorage.setItem('checkout', JSON.stringify(checkoutData));
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = (): void => {
    setCart([]);
    setCheckout(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout');
  };

  // Proceed to Shopify checkout
  const proceedToCheckout = (): void => {
    if (checkout?.checkoutUrl) {
      window.location.href = checkout.checkoutUrl;
    }
  };

  const value: CartContextType = {
    cart,
    cartCount,
    checkout,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    proceedToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};