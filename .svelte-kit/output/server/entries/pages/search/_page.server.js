import { s as searchProducts } from "../../../chunks/products.js";
const load = async ({ url }) => {
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
      q: "",
      error: err.message
    };
  }
};
export {
  load
};
