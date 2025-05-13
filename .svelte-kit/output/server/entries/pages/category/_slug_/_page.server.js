import { f as fetchProductsByCategorySlug } from "../../../../chunks/products.js";
async function load({ params }) {
  const { slug } = params;
  const data = await fetchProductsByCategorySlug(slug);
  return {
    categoryName: data.name,
    products: data.products,
    slug
  };
}
export {
  load
};
