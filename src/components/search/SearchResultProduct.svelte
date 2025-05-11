<script>
    import Rating from "../common/Rating.svelte";

    export let results = [];
    export let initialLimit = 4;
    export let expandBy = 10;

    let visible = initialLimit;

    $: displayed = results.slice(0, visible);

    function onViewMore() {
        visible += expandBy;
    }
</script>

<section class="mx-auto container mt-10 px-4">
    {#if displayed.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {#each displayed as item}
                <a href={`/product-details/${item.id}`} class="group block">
                    <img
                        src={item.image}
                        alt={item.name}
                        class="w-full h-auto object-cover rounded-xl border mb-3 transition-transform duration-300 group-hover:scale-105"
                    />

                    <h2
                        class="capitalize text-xs mb-2 md:text-sm lg:text-base font-poppins mt-3"
                    >
                        {item?.name}
                    </h2>

                    <div class="flex gap-3">
                        <Rating rate={item?.rating} />
                        <p class="text-xs items-center flex">{item.rating}/5</p>
                    </div>

                    <div class="flex font-poppins gap-4">
                        {#if item?.discount}
                            <p class="font-semibold text-base md:text-xl mt-2">
                                ${(
                                    item.price -
                                    (item.price * item.discount) / 100
                                ).toFixed(2)}
                            </p>
                        {:else}
                            <p
                                class="font-semibold mt-2 text-base md:text-xl text-black"
                            >
                                ${item?.price}
                            </p>
                        {/if}

                        {#if item?.discount}
                            <div class="flex gap-5">
                                <p
                                    class="font-semibold mt-2 text-base md:text-xl text-gray-400 line-through"
                                >
                                    ${item?.price}
                                </p>
                                <p
                                    class="bg-[#FFEBEB] text-[#FF3333] mt-3 md:mt-2 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full"
                                >
                                    - {item?.discount} %
                                </p>
                            </div>
                        {/if}
                    </div>
                </a>
            {/each}
        </div>

        {#if displayed.length < results.length}
            <div class="text-center mt-8">
                <button
                    on:click={onViewMore}
                    class="px-6 py-2 rounded-full border text-sm hover:bg-gray-100"
                >
                    View More
                </button>
            </div>
        {/if}
    {:else}
        <p class="text-center text-gray-500 mt-10">No results found.</p>
    {/if}
</section>
