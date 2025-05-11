// +layout.server.js
import { fetchCategoryTree } from "$lib/saleor/categories";

export async function load({ locals }) {
    const categories = await fetchCategoryTree();
    return { categories, user: locals.user || null };


}
