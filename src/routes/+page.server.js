// +page.server.js
import { fetchProducts } from "$lib/saleor/products";

export async function load() {
    const newArrivals = await fetchProducts(4);
    const topSelling = await fetchProducts(4);

    return {
        newArrivals,
        topSelling,
    };
}
