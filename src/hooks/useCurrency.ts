import { useAppSelector } from './useRedux';

export function useCurrency() {
    const { selectedCurrency } = useAppSelector((state) => state.currency);

    // Convert GBP price to selected currency and format
    const formatPrice = (priceInGBP: number): string => {
        const convertedPrice = priceInGBP * selectedCurrency.rate;

        // Format based on currency
        if (selectedCurrency.code === 'GBP') {
            return `£${convertedPrice.toFixed(2)}`;
        }

        if (selectedCurrency.code === 'AED') {
            return `AED ${convertedPrice.toFixed(2)}`;
        }

        return `${selectedCurrency.symbol}${convertedPrice.toFixed(2)}`;
    };

    // Get converted price as number (useful for calculations)
    const convertPrice = (priceInGBP: number): number => {
        return priceInGBP * selectedCurrency.rate;
    };

    return {
        selectedCurrency,
        formatPrice,
        convertPrice,
    };
}