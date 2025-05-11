// +server.js
import { fetchProducts } from "$lib/saleor/products";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const limit = parseInt(url.searchParams.get("limit") || "8");
    const products = await fetchProducts(limit);
    return json(products);
}
