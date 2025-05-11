import { fetchProductById, fetchRelatedProducts } from "$lib/saleor/products";

export async function load({ params }) {
    const { id } = params;

    try {
        const product = await fetchProductById(id);

        if (!product || !product.categoryId) {
            return {
                status: 404,
                error: "Product not found or missing category"
            };
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
        return {
            product: null,
            relatedProducts: [],
            error: e.message || "Error loading product"
        };
    }
}
