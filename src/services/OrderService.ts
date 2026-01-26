import client from '../lib/shopify';

interface OrderLineItem {
  variantId: string;
  quantity: number;
  price: number;
  title: string;
  customAttributes?: Array<{ key: string; value: string }>;
}

interface CreateOrderPayload {
  name: string;
  email: string;
  phone: string;
  lineItems: OrderLineItem[];
  note?: string;
  tags?: string[];
  deliveryAddress?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalPrice: number;
  subtotalPrice: number;
  totalTax: number;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  checkoutUrl: string;
  whatsappUrl: string;
  lineItems: Array<{
    title: string;
    quantity: number;
    price: number;
    customAttributes?: Array<{ key: string; value: string }>;
  }>;
}

/**
 * Create order using Shopify Storefront API for WhatsApp purchases
 * Creates a cart with buyer info, then generates WhatsApp message
 */
export const createOrderWithWhatsApp = async (orderData: CreateOrderPayload): Promise<Order> => {
  try {
    console.log('📦 Creating cart with Storefront API for WhatsApp purchase...');

    // Step 1: Create a cart with line items
    const cartMutation = `
      mutation CreateCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
              }
              totalTaxAmount {
                amount
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      priceV2 {
                        amount
                      }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const cartInput = {
      lines: orderData.lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
      buyerIdentity: {
        email: orderData.email,
        phone: orderData.phone,
      },
    };

    const cartResponse = await client.request(cartMutation, {
      variables: { input: cartInput },
    });

    if (cartResponse.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartResponse.data.cartCreate.userErrors[0].message}`);
    }

    const cart = cartResponse.data.cartCreate.cart;
    console.log('✅ Cart created:', cart.id);

    // Step 2: Update cart lines with custom attributes (customer details)
    const updateCartMutation = `
      mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
              }
              subtotalAmount {
                amount
              }
              totalTaxAmount {
                amount
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      priceV2 {
                        amount
                      }
                    }
                  }
                  attributes {
                    key
                    value
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const updateInput = {
      cartId: cart.id,
      lines: cart.lines.edges.map((edge: any, index: number) => ({
        id: edge.node.id,
        attributes: [
          ...(orderData.lineItems[index]?.customAttributes || []),
          {
            key: 'customerName',
            value: orderData.name,
          },
          {
            key: 'customerEmail',
            value: orderData.email,
          },
          {
            key: 'customerPhone',
            value: orderData.phone,
          },
          ...(orderData.deliveryAddress ? [{ key: 'deliveryAddress', value: orderData.deliveryAddress }] : []),
          ...(orderData.note ? [{ key: 'orderNote', value: orderData.note }] : []),
        ],
      })),
    };

    const updateResponse = await client.request(updateCartMutation, {
      variables: updateInput,
    });

    if (updateResponse.data.cartLinesUpdate.userErrors.length > 0) {
      console.warn('⚠️ Warning updating cart attributes:', updateResponse.data.cartLinesUpdate.userErrors);
    }

    const updatedCart = updateResponse.data.cartLinesUpdate.cart;
    console.log('✅ Cart attributes added');

    // Step 3: Update buyer information in cart
    const updateBuyerMutation = `
      mutation UpdateCartBuyer($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const buyerInput = {
      cartId: cart.id,
      buyerIdentity: {
        email: orderData.email,
        phone: orderData.phone,
      },
    };

    const buyerResponse = await client.request(updateBuyerMutation, {
      variables: buyerInput,
    });

    if (buyerResponse.data.cartBuyerIdentityUpdate.userErrors.length > 0) {
      console.warn('⚠️ Warning updating buyer identity:', buyerResponse.data.cartBuyerIdentityUpdate.userErrors);
    }

    const finalCheckoutUrl = buyerResponse.data.cartBuyerIdentityUpdate.cart.checkoutUrl || updatedCart.checkoutUrl;
    console.log('✅ Buyer information added');
    console.log('🔗 Checkout URL:', finalCheckoutUrl);

    // Step 4: Parse totals
    const totalAmount = parseFloat(updatedCart.cost.totalAmount.amount);
    const subtotalAmount = parseFloat(updatedCart.cost.subtotalAmount?.amount || '0');

    // Step 5: Generate WhatsApp message
    const whatsappMessage = generateWhatsAppMessage(orderData, updatedCart.lines.edges, totalAmount);
    const whatsappUrl = `https://wa.me/+971545613397?text=${encodeURIComponent(whatsappMessage)}`;

    console.log('📱 WhatsApp URL generated');

    // Step 6: Return order object
    const orderObject: Order = {
      id: cart.id,
      orderNumber: `ORDER-${cart.id.split('/').pop()}`,
      customerName: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      totalPrice: totalAmount,
      subtotalPrice: subtotalAmount,
      totalTax: 0,
      financialStatus: 'PENDING_WHATSAPP',
      fulfillmentStatus: 'UNFULFILLED',
      createdAt: new Date().toISOString(),
      checkoutUrl: finalCheckoutUrl,
      whatsappUrl: whatsappUrl,
      lineItems: updatedCart.lines.edges.map((edge: any) => ({
        title: edge.node.merchandise.product.title,
        quantity: edge.node.quantity,
        price: parseFloat(edge.node.merchandise.priceV2.amount),
        customAttributes: edge.node.attributes,
      })),
    };

    console.log('✅ Order prepared successfully - ready for WhatsApp purchase');
    return orderObject;

  } catch (error) {
    console.error('❌ Order creation error:', error);
    throw error;
  }
};

/**
 * Generate WhatsApp message for order
 */
const generateWhatsAppMessage = (orderData: CreateOrderPayload, lineItems: any[], totalAmount: number): string => {
  const itemsList = lineItems.map((edge: any, index: number) => {
    const item = edge.node;
    const price = parseFloat(item.merchandise.priceV2.amount);
    return `${index + 1}. *${item.merchandise.product.title}*
   Variant: ${item.title || 'Default'}
   Quantity: ${item.quantity}
   Price: AED ${price.toFixed(2)}`;
  }).join('\n\n');

  return `السلام عليكم,

I would like to purchase the following items from Tawaf Essentials:

📦 *ORDER DETAILS*

${itemsList}

─────────────────
💰 *Total Amount: AED ${totalAmount.toFixed(2)}*
─────────────────

👤 *CUSTOMER INFORMATION*

Name: ${orderData.name}
Email: ${orderData.email}
Phone: ${orderData.phone}
${orderData.deliveryAddress ? `Delivery Address: ${orderData.deliveryAddress}` : ''}

${orderData.note ? `\n📝 *Special Note:*\n${orderData.note}` : ''}

Please confirm this order and provide payment instructions.

JazakAllah Khair!`;
};

/**
 * Get cart details
 */
export const getCart = async (cartId: string) => {
  const query = `
    query GetCart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await client.request(query, {
    variables: { id: cartId },
  });

  return response.data.cart;
};

// Backward compatibility
export const createOrderWithCOD = createOrderWithWhatsApp;