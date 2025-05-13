import { a as fetchProducts } from "../../../../chunks/products.js";
import { j as json } from "../../../../chunks/index.js";
async function GET({ url }) {
  const limit = parseInt(url.searchParams.get("limit") || "8");
  const products = await fetchProducts(limit);
  return json(products);
}
export {
  GET
};
