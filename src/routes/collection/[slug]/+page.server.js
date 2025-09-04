import { fetchProductsFromCollection } from "$lib/saleor/products";

export async function load({ params }) {
  const { slug } = params;
  const data = await fetchProductsFromCollection(slug, 10, "EN");

  return {
    products: data,
    slug: slug,
  };
}
