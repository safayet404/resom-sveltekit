<script>
    import Rating from "../../components/common/Rating.svelte";
    import CommonProduct from "../../components/home/CommonProduct.svelte";

    export let data;

    let product = [...data.results];

    let sortOption = "default";

    $: if (sortOption === "priceLow") {
        product = [...product].sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
        product = [...product].sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHigh") {
        product = [...product].sort((a, b) => b.rating - a.rating);
    } else {
        product = [...data.results];
    }
</script>

<section
    class="min-h-screen container mx-auto mt-[35%] sm:mt-[25%] md:mt-[15%] px-4 py-10"
>
    <div class="flex justify-between">
        <div>
            <h1
                class="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold text-left"
            >
                Search results for: "{data.q}"
            </h1>
            <p class="mt-4">Found {data.results.length} products</p>
        </div>

        <div>
            <label for="sort" class="text-sm">Sort By</label>

            <select
                id="sort"
                bind:value={sortOption}
                class="border px-0.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-lg text-sm"
            >
                <option value="default">Default</option>
                <option value="priceLow">Price :Low to High</option>
                <option value="priceHigh">Price :High to Low</option>
                <option value="ratingHigh">Rating : High to Low</option>
            </select>
        </div>
    </div>

    {#if data.results.length > 0}
        <CommonProduct {product} />
    {:else}
        <p class="text-gray-500 mt-4">No results found.</p>
    {/if}
</section>
