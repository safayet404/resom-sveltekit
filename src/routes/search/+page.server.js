import { checkSearchProduct, searchProducts } from "$lib/saleor/products";

export const load = async ({ url }) => {
  try {
    const q = url.searchParams.get("q")?.toLowerCase() || "";
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const results = await checkSearchProduct(q, offset, limit, page);

    return {
      results,
      q,
      page,
    };
  } catch (err) {
    console.error("Search error:", err);
    return {
      results: [],
      q: "",
      page: 1,
      error: err.message,
    };
  }
};
