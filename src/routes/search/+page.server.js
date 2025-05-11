import { searchProducts } from "$lib/saleor/products";

export const load = async ({ url }) => {
  try {
    const q = url.searchParams.get("q")?.toLowerCase() || "";
    const results = await searchProducts(q);

    return {
      results,
      q
    };
  } catch (err) {
    console.error("Search error:", err);
    return {
      results: [],
      q: '',
      error: err.message
    };
  }
};
