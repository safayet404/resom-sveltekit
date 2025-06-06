import { searchProducts } from "$lib/saleor/products";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const queryText = url.searchParams.get('queryText');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    if (!queryText) {
        return json({ error: "Missing Query Text" }, { status: 400 });
    }

    try {
        const result = await searchProducts(queryText, limit);
        return json(result);
    } catch (error) {
        console.error("API error:", error);
        return json({ error: "Failed to fetch search products" }, { status: 500 });
    }
}
