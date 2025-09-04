<script>
  export let initialProducts = [];

  export let initialPageInfo;
  export let expandBy;
  export let collectionSlug;
  export let categorySlug;

  export let title;
  import { _ } from "svelte-i18n";
  import ProductCard from "../common/ProductCard.svelte";

  let product;

  let endCursor;
  let hasMore;
  let loading = false;
  $: {
    product = [...(initialProducts || [])];
    endCursor = initialPageInfo?.endCursor || null;
    hasMore = initialPageInfo?.hasNextPage ?? true;
    loading = false;
  }

  async function onViewAll() {
    if (!hasMore || loading) return;
    loading = true;

    try {
      const params = new URLSearchParams();
      params.append("limit", expandBy);
      if (endCursor) params.append("after", endCursor);
      if (collectionSlug) params.append("collection", collectionSlug);
      if (categorySlug) params.append("category", categorySlug);

      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();

      if (json?.product?.length) {
        product = [...product, ...json.product];
        endCursor = json.pageInfo?.endCursor;
        hasMore = json.pageInfo?.hasNextPage;
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Failed to load more products", err);
      hasMore = false;
    }

    loading = false;
  }
</script>

<section class="mx-auto mt-[100px] px-4 md:px-10">
  <h1
    class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-semibold mb-10"
  >
    {title}
  </h1>

  <div
    class="grid gap-4 2xl:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5"
  >
    {#each product as item}
      <ProductCard {item} />
    {/each}
  </div>

  {#if hasMore}
    <div class="text-center">
      <button
        class="mx-auto mt-10 border px-5 hover:scale-110 md:px-14 py-2 text-xs sm:text-sm md:text-base hover:bg-black hover:text-white transform transition-all duration-300 font-medium rounded-3xl"
        on:click={onViewAll}
        disabled={loading}
      >
        {#if loading}
          Loading...
        {:else}
          {$_("view_more")}
        {/if}
      </button>
    </div>
  {/if}
</section>
