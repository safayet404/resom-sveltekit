import { error } from "@sveltejs/kit";
import { fetchProductById, fetchRelatedProducts } from "$lib/saleor/products";

export async function load({ params }) {
    const { id } = params;

    try {
        const product = await fetchProductById(id);

        if (!product || !product.categoryId) {
            throw error(404, "Product not found or missing category");
        }

        const relatedProducts = await fetchRelatedProducts(
            product.categoryId,
            30,
            product.id // exclude current product
        );

        return {
            product,
            relatedProducts
        };
    } catch (e) {
        // log it if needed
        console.error("Error loading product page:", e);
        throw error(500, e?.message || "Error loading product");
    }
}
