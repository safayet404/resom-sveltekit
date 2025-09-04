export const prerender = false;

import {
  fetchCategoryTree,
  fetchCollectionTree,
  fetchCollectionTreeTranslation,
} from "$lib/saleor/categories.js";
import {
  fetchAllProduct,
  fetchProducts,
  fetchProductsFromCollection,
} from "$lib/saleor/products.js";

export async function load({ locals, cookies }) {
  let locale = cookies.get("locale");

  const { product: newArrivals, pageInfo: newArrivalsPageInfo } = await fetchProducts(10, locale);
  const { product: topSelling, pageInfo: topSellingPageInfo } = await fetchProducts(10, locale);

  const { product: summerPicks, pageInfo: summerPicksPageInfo } = await fetchProductsFromCollection(
    "summer-picks",
    10,
    locale
  );
  const { product: featuredProducts, pageInfo: featuredProductsPageInfo } =
    await fetchProductsFromCollection("featured-products", 10, locale);
  const { product: winterCollection, pageInfo: winterCollectionPageInfo } =
    await fetchProductsFromCollection("winter-collection", 10, locale);
  const collectionTree = await fetchCollectionTreeTranslation(locale);

  return {
    newArrivals,
    newArrivalsPageInfo,
    topSelling,
    topSellingPageInfo,
    summerPicks,
    summerPicksPageInfo,
    featuredProducts,
    featuredProductsPageInfo,
    winterCollection,
    winterCollectionPageInfo,
    collectionTree,

    user: locals.user ?? null,
  };
}
