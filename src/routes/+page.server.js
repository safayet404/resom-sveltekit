import { fetchProducts } from "$lib/saleor/products";

export async function load({ locals }) {
    const newArrivals = await fetchProducts(4);
    const topSelling = await fetchProducts(4);

    return {
        newArrivals,
        topSelling,
        user: locals.user ?? null // ✅ Fix: pass user to frontend
    };
}
