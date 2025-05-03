<script>
    import Icon from "@iconify/svelte";

    export let product = [];

    import Rating from "../common/Rating.svelte";
    import { favorite } from "../../stores/favorite";

    const priceAfterDiscount = product;
    export let title;
    let visibleProducts = 4;
    let expand = 10;
    function onViewAll() {
        visibleProducts += expand;
    }

    function addToFavorite(item) {
        favorite.update((items) => {
            const index = items.findIndex((i) => i.id === item.id);

            if (index !== -1) {
                items.splice(index, 1); // Remove
            } else {
                items.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    discount: item.discount,
                    image: item.image, // optional
                });
            }

            return items;
        });
    }

    let favoriteItems = [];

    $: favorite.subscribe((items) => {
        favoriteItems = items;
    });

    function isInFavorite(id) {
        return favoriteItems.some((item) => item.id === id);
    }
</script>

<section class="mx-auto container mt-10 px-4">
    <h1
        class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-bold mb-10"
    >
        {title}
    </h1>
    <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"
    >
        {#each product.slice(0, visibleProducts) as item}
            <a
                href={`/product-details/${item.id}`}
                class="cursor-pointer group block relative"
            >
                <div
                    class="transition-transform duration-300 hover:scale-105 relative"
                >
                    <img
                        alt="product-img"
                        class="w-full h-[250px] lg:h-[400px] rounded-xl"
                        src={item?.image}
                    />

                    <!-- Favorite Icon -->
                    <button
                        type="button"
                        class="absolute top-2 right-3 text-lg z-10"
                        onclick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            addToFavorite(item); // ✅ not just addToFavorite()
                        }}
                        aria-label="Add to favorite"
                    >
                        <Icon
                            icon={`${isInFavorite(item.id) ? "material-symbols:favorite" : "material-symbols:favorite-outline"}`}
                        />
                    </button>
                </div>

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
                            ${item?.price -
                                ((item.price * item.discount) / 100).toFixed(2)}
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

    {#if visibleProducts < product.length}
        <div>
            <button
                onclick={onViewAll}
                class="mx-auto text-center block mt-10 border px-7 md:px-14 py-2 rounded-3xl"
                >View More</button
            >
        </div>
    {/if}
</section>
