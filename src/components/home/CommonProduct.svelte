<script>
    import Icon from "@iconify/svelte";
    import Rating from "../common/Rating.svelte";
    import { favorite } from "../../stores/favorite";
    import Loader from "../common/Loader.svelte";
    import toast from "svelte-french-toast";

    export let title;
    export let initialProducts = [];
    export let initialLimit = 4;
    export let expandBy = 10;

    let product = [...initialProducts];
    let currentLimit = initialLimit;
    let loading = false;

    function addToFavorite(item) {
        favorite.update((items) => {
            const index = items.findIndex((i) => i.id === item.id);
            if (index !== -1) {
                items.splice(index, 1); // Remove
                toast.success("Product removed from wishlist");
            } else {
                items.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    discount: item.discount,
                    image: item.image,
                });

                toast.success("Product Added to wishlist");
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

    let hasMore = true;

    async function onViewAll() {
        loading = true;
        currentLimit += expandBy;

        try {
            const res = await fetch(`/api/products?limit=${currentLimit}`);
            // const res = await fetch(`${fetchUrl}&limit=${currentLimit}`);
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

<section class="mx-auto container mt-10 px-4">
    <h1
        class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-bold mb-10"
    >
        {title}
    </h1>

    <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"
    >
        {#each product as item}
            <a
                href={`/product-details/${item.id}`}
                class="cursor-pointer group block relative"
            >
                <div
                    class="transition-transform duration-300 hover:scale-105 relative"
                >
                    <img
                        alt="product-img"
                        class="w-full h-auto object-cover rounded-xl border"
                        src={item?.image}
                    />

                    <button
                        type="button"
                        class="absolute top-2 right-3 text-lg z-10"
                        on:click|preventDefault|stopPropagation={() =>
                            addToFavorite(item)}
                        aria-label="Add to favorite"
                    >
                        <Icon
                            icon={isInFavorite(item.id)
                                ? "material-symbols:favorite"
                                : "material-symbols:favorite-outline"}
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
                        <p
                            class="font-semibold text-sm sm:text-base md:text-xl mt-2"
                        >
                            ${(
                                item.price -
                                (item.price * item.discount) / 100
                            ).toFixed(2)}
                        </p>
                    {:else}
                        <p
                            class="font-semibold mt-2 text-xs sm:text-base md:text-xl text-black"
                        >
                            ${item?.price}
                        </p>
                    {/if}

                    {#if item?.discount}
                        <div class="flex gap-5">
                            <p
                                class="font-semibold mt-2 text-xs sm:text-base md:text-xl text-gray-400 line-through"
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
