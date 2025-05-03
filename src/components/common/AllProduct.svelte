<script>
    export let product = [];

    import Rating from "../common/Rating.svelte";

    const priceAfterDiscount = product;
    export let title;
</script>

<section class="mx-auto container mt-10 px-4">
    <h1
        class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-bold mb-10"
    >
        {title}
    </h1>
    <div
        class="grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"
    >
        {#each product as item}
            <div>
                <div class="transition-transform duration-300 hover:scale-105">
                    <img
                        alt="product-img"
                        class="w-full h-[250px] lg:h-[400px] rounded-xl"
                        src={item?.image}
                    />
                </div>

                <h2 class="capitalize font-poppins mt-3">{item?.name}</h2>

                <div class="flex gap-3">
                    <Rating rate={item?.rating} />
                    <p class="text-xs items-center flex">{item.rating}/5</p>
                </div>
                <div class="flex gap-4">
                    {#if item?.discount}
                        <p class="font-semibold mt-2 text-xl">
                            ${item?.price -
                                ((item.price * item.discount) / 100).toFixed(2)}
                        </p>
                    {/if}
                    <p
                        class="font-semibold mt-2 text-xl text-gray-400 line-through"
                    >
                        ${item?.price}
                    </p>

                    <p
                        class="bg-[#FFEBEB] text-[#FF3333] mt-1 md:mt-2 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full"
                    >
                        - {item?.discount} %
                    </p>
                </div>
            </div>
        {/each}
    </div>
</section>
