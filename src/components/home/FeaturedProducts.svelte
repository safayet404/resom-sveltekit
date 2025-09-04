<script>
    import Icon from "@iconify/svelte";
    import Rating from "../common/Rating.svelte";
    import Loader from "../common/Loader.svelte";
    import toast from "svelte-french-toast";
    import ProductCard from "../common/ProductCard.svelte";

    export let title;
    export let initialProducts = [];
    export let initialLimit = 4;
    export let expandBy = 10;

    let product = [...initialProducts];
    let currentLimit = initialLimit;
    let loading = false;

    let hasMore = true;

    async function onViewAll() {
        loading = true;
        currentLimit += expandBy;

        try {
            const res = await fetch(`/api/products?limit=${currentLimit}`);
            const updated = await res.json();

            product = updated;

            if (updated.length < currentLimit) {
                hasMore = false;
            }
        } catch (err) {
            console.error("Failed to load more products", err);
            hasMore = false;
        }

        loading = false;
    }
</script>

<section
    class="mx-auto container my-[100px] section-padding-left section-padding-right"
>
    <h1
        class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-medium mb-10"
    >
        {title}
    </h1>

    <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"
    >
        {#each product as item}
            <ProductCard {item} />
        {/each}
    </div>

    {#if hasMore}
        <div class="text-center">
            <button
                class="mx-auto mt-10 border px-5 md:px-14 py-2 text-xs sm:text-sm md:text-base font-medium rounded-3xl"
                on:click={onViewAll}
                disabled={loading}
            >
                {#if loading}
                    Loading...
                    <!-- Loading... <Loader /> -->
                {:else}
                    View More
                {/if}
            </button>
        </div>
    {/if}
</section>

<style>
   
</style>
