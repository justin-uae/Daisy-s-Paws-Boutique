import client from '../lib/shopify';

interface Metafield {
  key: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  features: string[];
}

interface ProductDetail extends Product {
  descriptionHtml: string;
  variantId: string; // Just need the variant ID for cart
}

interface CartLineItem {
  merchandiseId: string;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: any[];
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface Customer {
  id: string;
}

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: number;
  date: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currencyCode: string;
  status: string;
  items: OrderItem[];
}

export interface CustomerData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  displayName: string;
}

// Get all collections
export const getAllCategoryCollections = async (): Promise<{
  id: string;
  title: string;
  description: string;
  image: string;
  handle: string;
}[]> => {
  const query = `
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const { data } = await client.request(query);

  return data?.collections?.edges?.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    description: edge.node.description,
    image: edge.node.image?.url || "",
    handle: edge.node.handle,
  }));
};

// Get collections with products
export const getCollectionsWithProducts = async () => {
  const query = `
    query GetCollectionsWithProducts {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  metafields(identifiers: [
                    {namespace: "custom", key: "category"}
                  ]) {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);

    if (!data?.collections?.edges) return [];

    return data.collections.edges.map((collectionEdge: any) => {
      const collection = collectionEdge.node;

      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        description: collection.description,
        image: collection.image?.url || "",
        products: collection.products?.edges?.map((productEdge: any) => ({
          id: productEdge.node.id,
          title: productEdge.node.title,
          image: productEdge.node.images?.edges[0]?.node?.url || "",
          category:
            productEdge.node.metafields?.find((m: any) => m?.key === "category")
              ?.value || "",
        })),
      };
    });
  } catch (error) {
    console.error("Error fetching collections with products:", error);
    return [];
  }
};

// Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const query = `
    query GetProducts {
      products(first: 240) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            metafields(identifiers: [
              {namespace: "custom", key: "category"},
              {namespace: "custom", key: "rating"},
              {namespace: "custom", key: "reviews_count"},
              {namespace: "custom", key: "features"}
            ]) {
              key
              value
            }
          }
        }
      }
    }
  `;

  const { data } = await client.request(query);

  return data.products.edges.map((edge: any) => {
    const featuresRaw = edge.node.metafields?.find((m: Metafield) => m?.key === 'features')?.value;
    let features: string[] = [];

    if (featuresRaw) {
      try {
        features = JSON.parse(featuresRaw);
      } catch (e) {
        features = featuresRaw.includes(',')
          ? featuresRaw.split(',').map((s: string) => s.trim())
          : [featuresRaw];
      }
    }

    return {
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
      originalPrice: edge.node.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(edge.node.compareAtPriceRange.minVariantPrice.amount)
        : null,
      images: edge.node.images.edges.map((img: any) => img.node.url),
      category: edge.node.metafields?.find((m: Metafield) => m?.key === 'category')?.value || '',
      rating: parseFloat(edge.node.metafields?.find((m: Metafield) => m?.key === 'rating')?.value || '0'),
      reviewsCount: parseInt(edge.node.metafields?.find((m: Metafield) => m?.key === 'reviews_count')?.value || '0'),
      features: features,
    };
  });
};

// Fetch single product by ID
export const getProductById = async (productId: string): Promise<ProductDetail> => {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "category"},
          {namespace: "custom", key: "rating"},
          {namespace: "custom", key: "reviews_count"},
          {namespace: "custom", key: "features"}
        ]) {
          key
          value
        }
      }
    }
  `;

  const { data } = await client.request(query, { variables: { id: productId } });
  const product = data.product;

  const featuresRaw = product.metafields?.find((m: Metafield) => m?.key === 'features')?.value;
  let features: string[] = [];

  if (featuresRaw) {
    try {
      features = JSON.parse(featuresRaw);
    } catch (e) {
      features = featuresRaw.includes(',')
        ? featuresRaw.split(',').map((s: string) => s.trim())
        : [featuresRaw];
    }
  }

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    originalPrice: product.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : null,
    images: product.images.edges.map((img: any) => img.node.url),
    variantId: product.variants.edges[0]?.node.id || '', // Get first (and only) variant ID
    category: product.metafields?.find((m: Metafield) => m?.key === 'category')?.value || '',
    rating: parseFloat(product.metafields?.find((m: Metafield) => m?.key === 'rating')?.value || '0'),
    reviewsCount: parseInt(product.metafields?.find((m: Metafield) => m?.key === 'reviews_count')?.value || '0'),
    features: features,
  };
};

// Create cart
export const createCart = async (lineItems: CartLineItem[]): Promise<Cart> => {
  const mutation = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
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
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
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

  const { data } = await client.request(mutation, {
    variables: {
      input: {
        lines: lineItems.map(item => ({
          merchandiseId: item.merchandiseId,
          quantity: item.quantity,
          attributes: item.attributes || []
        }))
      }
    }
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
};

// Add items to existing cart
export const addToCart = async (cartId: string, lineItems: CartLineItem[]): Promise<Cart> => {
  const mutation = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
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
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
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

  const { data } = await client.request(mutation, {
    variables: {
      cartId,
      lines: lineItems.map(item => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
        attributes: item.attributes || []
      }))
    }
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
};

// Update cart line items
export const updateCartLines = async (cartId: string, lines: Array<{ id: string; quantity: number }>): Promise<Cart> => {
  const mutation = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
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

  const { data } = await client.request(mutation, {
    variables: {
      cartId,
      lines
    }
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
};

// Remove cart line items
export const removeCartLines = async (cartId: string, lineIds: string[]): Promise<Cart> => {
  const mutation = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
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

  const { data } = await client.request(mutation, {
    variables: {
      cartId,
      lineIds
    }
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
};

// Get customer data
export const getCustomerData = async (customerAccessToken: string): Promise<CustomerData> => {
  const query = `
    query GetCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        createdAt
        displayName
      }
    }
  `;

  const { data } = await client.request(query, {
    variables: { customerAccessToken }
  });

  if (!data.customer) {
    throw new Error('Customer not found or invalid access token');
  }

  return data.customer;
};

// Customer login
export const customerLogin = async (email: string, password: string): Promise<CustomerAccessToken> => {
  const mutation = `
    mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
          field
        }
      }
    }
  `;

  const { data } = await client.request(mutation, {
    variables: {
      input: {
        email,
        password
      }
    }
  });

  if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(data.customerAccessTokenCreate.customerUserErrors[0].message);
  }

  return data.customerAccessTokenCreate.customerAccessToken;
};

// Get customer orders
export const getCustomerOrders = async (customerAccessToken: string): Promise<Order[]> => {
  const query = `
    query GetCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPriceV2 {
                amount
                currencyCode
              }
              subtotalPriceV2 {
                amount
                currencyCode
              }
              totalTaxV2 {
                amount
                currencyCode
              }
              totalShippingPriceV2 {
                amount
                currencyCode
              }
              fulfillmentStatus
              financialStatus
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      priceV2 {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await client.request(query, {
    variables: { customerAccessToken }
  });

  if (!data.customer) {
    throw new Error('Customer not found or invalid access token');
  }

  return data.customer.orders.edges.map((edge: any) => ({
    id: edge.node.id,
    orderNumber: edge.node.orderNumber,
    date: edge.node.processedAt,
    subtotal: parseFloat(edge.node.subtotalPriceV2?.amount || edge.node.totalPriceV2.amount),
    tax: parseFloat(edge.node.totalTaxV2?.amount || '0'),
    shipping: parseFloat(edge.node.totalShippingPriceV2?.amount || '0'),
    total: parseFloat(edge.node.totalPriceV2.amount),
    currencyCode: edge.node.totalPriceV2.currencyCode,
    status: edge.node.fulfillmentStatus || edge.node.financialStatus,
    items: edge.node.lineItems.edges.map((item: any) => ({
      title: item.node.title,
      quantity: item.node.quantity,
      price: parseFloat(item.node.variant.priceV2.amount),
      image: item.node.variant.image?.url
    }))
  }));
};

// Customer registration
export const customerRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<Customer> => {
  const mutation = `
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          message
          field
        }
      }
    }
  `;

  const { data } = await client.request(mutation, {
    variables: {
      input: {
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing: false
      }
    }
  });

  if (data.customerCreate.customerUserErrors.length > 0) {
    throw new Error(data.customerCreate.customerUserErrors[0].message);
  }

  return data.customerCreate.customer;
};

// Legacy function names for backward compatibility
export const createCheckout = createCart;
export const addToCheckout = addToCart;
export const getAllExcursions = getAllProducts;
export const getExcursionById = getProductById;