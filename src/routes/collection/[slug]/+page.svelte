<script>
  import { browser } from "$app/environment";
  import { fetchProductsFromCollection } from "$lib/saleor/products";
  import CommonCategory from "../../../components/category/CommonCategory.svelte";
  import CommonProduct from "../../../components/home/CommonProduct.svelte";
  import SearchResultProduct from "../../../components/search/SearchResultProduct.svelte";

  import { _, locale as i18nLocale, locale } from "svelte-i18n";

  export let data;
  $: collectionSlug = data?.slug;

  let currentCollection = data?.products?.product;

  let currentCollectionPageInfo = data?.products?.pageInfo;

  $: if (browser && i18nLocale && i18nLocale !== data.locale) {
    const languageCode = $i18nLocale.toUpperCase();
    fetchProductsFromCollection(collectionSlug, 10, languageCode)
      .then((res) => {
        currentCollection = res.product;

        currentCollectionPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated new category:", err);
        toast.error("Failed to load translated new arrivals.");
      });
  }
</script>

<svelte:head>
  <title>Collection</title>
  <meta name="description" content="Product Category Page" />
</svelte:head>
<section class=" mx-auto px-4 lg:px-10 py-10">
  <h1 class="text-base sm:text-lg text-center md:text-2xl font-bold mt-5 mb-6">
    Products in <span class="capitalize"> {data.slug}</span>
  </h1>

  {#if data?.products?.product.length > 0}
    <CommonProduct
      collectionSlug={data?.slug}
      initialProducts={currentCollection}
      initialPageInfo={currentCollectionPageInfo}
      expandBy={8}
    />
  {:else}
    <p class="text-center mt-[10%] mb-[20%] text-red-600">No products found in this collection.</p>
  {/if}
</section>
