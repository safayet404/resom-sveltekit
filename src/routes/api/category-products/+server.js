import { json } from '@sveltejs/kit';
import { fetchProductsByCategorySlug } from '$lib/saleor/products';

export async function GET({ url }) {
    const slug = url.searchParams.get('slug');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    if (!slug) {
        return json({ error: 'Missing category slug' }, { status: 400 });
    }

    try {
        const result = await fetchProductsByCategorySlug(slug, limit);
        return json(result);
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Failed to fetch category products' }, { status: 500 });
    }
}
