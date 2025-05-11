<script>
    import SearchResultProduct from "../../components/search/SearchResultProduct.svelte";

    export let data;

    let sortOption = "default";
    let sorted = [...data.results];

    $: {
        const base = [...data.results];
        if (sortOption === "priceLow") {
            sorted = base.sort((a, b) => a.price - b.price);
        } else if (sortOption === "priceHigh") {
            sorted = base.sort((a, b) => b.price - a.price);
        } else if (sortOption === "ratingHigh") {
            sorted = base.sort((a, b) => b.rating - a.rating);
        } else {
            sorted = base;
        }
    }
</script>

<svelte:head>
    <title>Search Result</title>
    <meta name="description" content="Product Search Result" />
</svelte:head>
<!-- Search Header & Sort -->
<section class="container mx-auto p-4">
    <div class="flex justify-between mt-20 items-center mb-4">
        <div class="flex flex-col gap-2">
            <h2 class="text-xl font-semibold">Search: "{data.q}"</h2>
            <p>{sorted.length} items found for "{data?.q}"</p>
        </div>
        <select
            bind:value={sortOption}
            class="border px-2 py-1 rounded text-sm"
        >
            <option value="default">Default</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
        </select>
    </div>
    <SearchResultProduct results={sorted} initialLimit={4} expandBy={10} />
</section>
