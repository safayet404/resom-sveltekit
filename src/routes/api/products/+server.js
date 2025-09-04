// /api/products/+server.js
import {
  fetchProducts,
  fetchProductsByCategorySlug,
  fetchProductsFromCollection,
} from "$lib/saleor/products";
import { json } from "@sveltejs/kit";

export async function GET({ url, cookies }) {
  let locale = cookies.get("locale");
  const after = url.searchParams.get("after");

  const limit = parseInt(url.searchParams.get("limit") || "10");
  const collectionSlug = url.searchParams.get("collection");
  const categorySlug = url.searchParams.get("category");

  let products;

  if (collectionSlug) {
    products = await fetchProductsFromCollection(collectionSlug, limit, locale, after);
  } else if (categorySlug) {
    products = await fetchProductsByCategorySlug(categorySlug, limit, after);
  } else {
    products = await fetchProducts(limit, locale, after);
  }

  return json(products);
}
