// src/routes/api/live-search/+server.js
import { json } from '@sveltejs/kit';
import { checkSearchProduct } from '$lib/saleor/products';

export async function GET({ url }) {
    const q = url.searchParams.get('q')?.toLowerCase() || '';
    const limit = 5;

    try {
        const results = await checkSearchProduct(q, 0, limit, 1);
        return json({ hits: results.hits });
    } catch (err) {
        return json({ error: 'Search failed', hits: [] }, { status: 500 });
    }
}
