<script>
    import CommonCategory from "../../../components/category/CommonCategory.svelte";
    import CommonProduct from "../../../components/home/CommonProduct.svelte";
    import SearchResultProduct from "../../../components/search/SearchResultProduct.svelte";

    export let data;
</script>

<svelte:head>
    <title>Category</title>
    <meta name="description" content="Product Category Page" />
</svelte:head>
<section class="container mx-auto px-4 py-10 mt-10">
    <h1
        class=" text-base sm:text-lg text-center md:text-2xl font-bold lg:mt-0 mt-10 sm:mt-20 mb-6"
    >
        Products in {data.categoryName}
    </h1>

    {#if data.products.length > 0}
        <CommonCategory
            initialProducts={data.products}
            fetchUrl={`/api/category-products?slug=${data.slug}`}
            initialLimit={4}
            slug={data.slug}
            expandBy={10}
        />
    {:else}
        <p>No products found in this category.</p>
    {/if}
</section>
