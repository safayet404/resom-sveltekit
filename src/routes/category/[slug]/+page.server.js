// src/routes/category/[slug]/+page.server.js

import { fetchProductsByCategorySlug } from "$lib/saleor/products";

export async function load({ params }) {
    const { slug } = params;
    const data = await fetchProductsByCategorySlug(slug);

    return {
        categoryName: data.name,
        products: data.products,
        slug: slug
    };
}
