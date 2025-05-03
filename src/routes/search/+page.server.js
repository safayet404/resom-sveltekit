import { product } from '../../data/productData.js';

export const load = async ({ url }) => {
    try {
        const q = url.searchParams.get("q")?.toLowerCase() || "";

        const normalizedQuery = q.replace(/[-\s]/g, ""); // remove spaces & dashes

        const results = product.filter((item) => {
            const normalizedName = item.name.toLowerCase().replace(/[-\s]/g, "");
            return normalizedName.includes(normalizedQuery);
        });


        return {
            results,
            q
        };
    } catch (err) {
        console.error("Error in +page.server.js:", err);
        return {
            results: [],
            q: '',
            error: err.message
        };
    }
};
