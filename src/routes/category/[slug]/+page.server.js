// src/routes/category/[slug]/+page.server.js

import { fetchProductsByCategorySlug } from "$lib/saleor/products";

export async function load({ params }) {
  const { slug } = params;
  const data = await fetchProductsByCategorySlug(slug, 10, "EN");

  return {
    products: data,
    slug: slug,
  };
}
