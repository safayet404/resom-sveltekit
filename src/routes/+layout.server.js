// +layout.server.js
import { fetchCategoryTree } from "$lib/saleor/categories";

export const prerender = false;

export async function load({ setHeaders, locals }) {
    const categories = await fetchCategoryTree();

    setHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-cache', // For some CDNs
        'Vary': '*' // Important for CDNs
    });

    return {
        categories,
        user: locals.user || null,
        version: Date.now()
    };
}
