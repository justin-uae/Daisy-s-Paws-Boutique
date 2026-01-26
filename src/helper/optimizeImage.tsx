export const optimizeShopifyImage = (url: string, width: number) => {
    if (!url) return url;
    return url.includes("?")
        ? `${url}&width=${width}`
        : `${url}?width=${width}`;
};