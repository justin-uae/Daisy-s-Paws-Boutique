import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategoryCollections, getAllProducts, getCollectionsWithProducts, getProductById } from '../services/shopifyService';

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
    variantId: string;
}

interface Collection {
    id: string;
    title: string;
    description: string;
    image: string;
    handle: string;
}

interface CollectionWithProducts extends Collection {
    products: Array<{
        id: string;
        title: string;
        image: string;
        category: string;
    }>;
}

interface ProductsState {
    products: Product[];
    selectedProduct: ProductDetail | null;
    collections: Collection[];
    collectionsWithProducts: CollectionWithProducts[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    collections: [],
    collectionsWithProducts: [],
    loading: false,
    error: null,
};

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const products = await getAllProducts();
            return products;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId: string, { rejectWithValue }) => {
        try {
            const product = await getProductById(productId);
            return product;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchAllCollections = createAsyncThunk(
    'products/fetchAllCollections',
    async (_, { rejectWithValue }) => {
        try {
            const collections = await getAllCategoryCollections();
            return collections;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchCollectionsWithProducts = createAsyncThunk(
    'products/fetchCollectionsWithProducts',
    async (_, { rejectWithValue }) => {
        try {
            const collections = await getCollectionsWithProducts();
            return collections;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all products
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch single product
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch all collections
        builder
            .addCase(fetchAllCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.collections = action.payload;
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch collections with products
        builder
            .addCase(fetchCollectionsWithProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectionsWithProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionsWithProducts = action.payload;
            })
            .addCase(fetchCollectionsWithProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;