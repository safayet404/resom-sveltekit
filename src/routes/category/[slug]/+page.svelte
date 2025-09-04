<script>
  import { browser } from "$app/environment";
  import { fetchProductsByCategorySlug } from "$lib/saleor/products";
  import CommonCategory from "../../../components/category/CommonCategory.svelte";
  import CommonProduct from "../../../components/home/CommonProduct.svelte";
  import SearchResultProduct from "../../../components/search/SearchResultProduct.svelte";
  import { _, locale as i18nLocale, locale } from "svelte-i18n";

  export let data;
  $: categorySlug = data?.slug;
  let currentCategory = data?.products?.product;

  let currentCategoryPageInfo = data?.products?.pageInfo;

  $: if (browser && i18nLocale && i18nLocale !== data.locale) {
    const languageCode = $i18nLocale.toUpperCase();
    fetchProductsByCategorySlug(categorySlug, 10, languageCode)
      .then((res) => {
        currentCategory = res.product;
        currentCategoryPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated new category:", err);
        toast.error("Failed to load translated new arrivals.");
      });
  }
</script>

<svelte:head>
  <title>Category</title>
  <meta name="description" content="Product Category Page" />
</svelte:head>
<section class=" mx-auto px-4 lg:px-10">
  <h1 class=" text-base sm:text-lg text-center md:text-3xl font-semibold mt-10 mb-6">
    Products in <span class="capitalize">{data?.slug}</span>
  </h1>

  {#if data?.products?.product.length > 0}
    <CommonProduct
      categorySlug={data?.slug}
      initialProducts={currentCategory}
      initialPageInfo={currentCategoryPageInfo}
      expandBy={10}
    />
  {:else}
    <p class="text-center mt-[10%] mb-[20%] text-red-600">No products found in this category!</p>
  {/if}
</section>
