import client from '../lib/shopify';

interface Metafield {
  key: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  availableForSale: string;
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
  howToMeasureImage: any;
  sizeChartImage: any;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    availableForSale: boolean;
  }>;
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

/**
 * Fetch banner images from collection's list metafield
 */
export const fetchBannerImages = async (collectionHandle: string = 'frontpage'): Promise<string[]> => {
  const query = `
    query getCollectionBanners($handle: String!) {
      collection(handle: $handle) {
        metafield(namespace: "custom", key: "banner_image") {
          type
          references(first: 20) {
            edges {
              node {
                ... on MediaImage {
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
  `;

  const variables = { handle: collectionHandle };

  try {
    const response = await fetch(
      `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const { data } = await response.json();

    // Extract image URLs from the list
    if (!data?.collection?.metafield?.references?.edges) {
      console.warn('No banner images found in collection metafield');
      return [];
    }

    const images = data.collection.metafield.references.edges
      .map((edge: any) => edge.node.image?.url)
      .filter((url: string) => url);
    return images;

  } catch (error) {
    console.error('Error fetching banner images:', error);
    return [];
  }
};

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
            availableForSale
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
      availableForSale: edge.node.availableForSale,
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

// Fetch single product by ID with Variants
export const getProductById = async (productId: string): Promise<ProductDetail> => {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        descriptionHtml
        availableForSale
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
        variants(first: 50) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "category"},
          {namespace: "custom", key: "rating"},
          {namespace: "custom", key: "reviews_count"},
          {namespace: "custom", key: "features"},
          {namespace: "custom", key: "how_to_measure"},
          {namespace: "custom", key: "size_chart"}
        ]) {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
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

  // Parse variants
  const variants = product.variants.edges.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    price: parseFloat(edge.node.priceV2.amount),
    availableForSale: edge.node.availableForSale,
  }));

  // Get "How to Measure" image URL
  const howToMeasureMetafield = product.metafields?.find((m: Metafield) => m?.key === 'how_to_measure');
  const howToMeasureImage = howToMeasureMetafield?.reference?.image?.url || null;

  // Get "Size Chart" image URL
  const sizeChartMetafield = product.metafields?.find((m: Metafield) => m?.key === 'size_chart');
  const sizeChartImage = sizeChartMetafield?.reference?.image?.url || null;

  return {
    id: product.id,
    title: product.title,
    availableForSale: product.availableForSale,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    originalPrice: product.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : null,
    images: product.images.edges.map((img: any) => img.node.url),
    variants: variants,
    category: product.metafields?.find((m: Metafield) => m?.key === 'category')?.value || '',
    rating: parseFloat(product.metafields?.find((m: Metafield) => m?.key === 'rating')?.value || '0'),
    reviewsCount: parseInt(product.metafields?.find((m: Metafield) => m?.key === 'reviews_count')?.value || '0'),
    features: features,
    howToMeasureImage: howToMeasureImage,
    sizeChartImage: sizeChartImage,
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

// Replace all cart lines (for quantity updates and removals)
export const replaceCartLines = async (cartId: string, lineItems: CartLineItem[]): Promise<Cart> => {
  // First, get current cart to get line IDs
  const getCartQuery = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
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
    }
  `;

  try {
    const { data: cartData } = await client.request(getCartQuery, {
      variables: { cartId }
    });

    // Remove all existing lines if any
    if (cartData?.cart?.lines?.edges?.length > 0) {
      const lineIds = cartData.cart.lines.edges.map((edge: any) => edge.node.id);
      await removeCartLines(cartId, lineIds);
    }

    // Add new lines if any
    if (lineItems.length > 0) {
      const updatedCart = await addToCart(cartId, lineItems);
      return updatedCart;
    } else {
      // Return cart with updated data
      const emptyCartData = await client.request(getCartQuery, {
        variables: { cartId }
      });
      return {
        id: emptyCartData.data.cart.id,
        checkoutUrl: emptyCartData.data.cart.checkoutUrl,
        lines: [],
        cost: emptyCartData.data.cart.cost
      };
    }
  } catch (error) {
    // If cart doesn't exist or is expired, create a new one
    console.log('Cart not found or expired, creating new cart:', error);
    if (lineItems.length > 0) {
      return await createCart(lineItems);
    } else {
      throw new Error('Cannot create empty cart');
    }
  }
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