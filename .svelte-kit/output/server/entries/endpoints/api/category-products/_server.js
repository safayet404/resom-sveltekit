import { j as json } from "../../../../chunks/index.js";
import { f as fetchProductsByCategorySlug } from "../../../../chunks/products.js";
async function GET({ url }) {
  const slug = url.searchParams.get("slug");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  if (!slug) {
    return json({ error: "Missing category slug" }, { status: 400 });
  }
  try {
    const result = await fetchProductsByCategorySlug(slug, limit);
    return json(result);
  } catch (error) {
    console.error("API Error:", error);
    return json({ error: "Failed to fetch category products" }, { status: 500 });
  }
}
export {
  GET
};
