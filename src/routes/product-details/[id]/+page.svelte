<script>
    import { page } from "$app/stores";
    import { cart } from "../../../stores/cart";
    import { fixImageUrl } from "$lib/utils/fixImageUrl";
    import SearchResultProduct from "../../../components/search/SearchResultProduct.svelte";
    import Rating from "../../../components/common/Rating.svelte";
    import toast from "svelte-french-toast";
    import DetailsRatingfaq from "../../../components/product/DetailsRatingfaq.svelte";
    import UserReview from "../../../components/product/UserReview.svelte";
    import ByStyle from "../../../components/home/ByStyle.svelte";
    import { slide } from "svelte/transition";

    export let data;

    let product;
    let relatedProducts;

    $: if (data) {
        product = data.product;
        relatedProducts = data.relatedProducts;
    }

    let selectedImage;
    let selectedColor;
    let selectedSize;
    let quantity = 1;
    let isOpen = false;

    $: if (product) {
        selectedImage = product?.images?.[0];
        selectedColor = product?.colors?.[0];
        selectedSize = product?.sizes?.[0];
        quantity = 1;
        isOpen = false;
    }

    function normalize(val) {
        return val?.toLowerCase().replace(/\s+/g, "-");
    }

    $: matchedVariant = product?.variantMap?.find((v) => {
        const variantSize = normalize(v.attributes.size);
        const variantColor = normalize(v.attributes.color);
        return (
            (!selectedSize || variantSize === normalize(selectedSize)) &&
            (!selectedColor || variantColor === normalize(selectedColor))
        );
    });

    $: finalPrice = matchedVariant?.price ?? product?.basePrice;
    $: priceBeforeDiscount = product?.basePrice;

    function toggle() {
        isOpen = !isOpen;
    }

    function addToCart() {
        cart.update((items) => {
            const index = items.findIndex(
                (item) =>
                    item.id === product.id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize,
            );

            if (index !== -1) {
                items[index].quantity += quantity;
                toast.success("Product already in cart");
            } else {
                items.push({
                    id: product.id,
                    variantId: matchedVariant?.id,
                    name: product.name,
                    price: finalPrice,
                    priceDiscount: priceBeforeDiscount,
                    discount: product?.discount,
                    selectedColor,
                    selectedSize,
                    thumbnail: product?.image,
                    quantity,
                });
                toast.success("Product added to cart");
            }

            return items;
        });
    }
</script>

<svelte:head>
    <title>Product Details</title>
    <meta name="description" content="Product Details Page" />
</svelte:head>

{#key data.product.id}
    <section class="container mx-auto p-4 mt-[40%] md:mt-[20%] lg:mt-[10%]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="grid grid-cols-12">
                <div
                    class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2"
                >
                    {#each product?.images as item}
                        <button
                            class="w-20 h-20 p-0 border rounded overflow-hidden"
                            type="button"
                            on:click={() => (selectedImage = item)}
                            aria-label="Select product image"
                        >
                            <img
                                src={fixImageUrl(item)}
                                alt="product thumbnail"
                                class={`w-full h-full object-cover rounded-lg ${item === selectedImage ? "border border-black" : ""}  `}
                            />
                        </button>
                    {/each}
                </div>
                <div
                    class="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10"
                >
                    <img
                        class="w-full h-auto object-cover rounded-lg"
                        src={fixImageUrl(selectedImage)}
                        alt="Product preview"
                    />
                </div>
            </div>

            <div>
                <h2
                    class="capitalize text-base sm:text-lg md:text-3xl lg:text-4xl font-poppins mt-3"
                >
                    {product?.name}
                </h2>

                <div class="flex mt-2 gap-3">
                    <Rating rate={product?.rating} />
                    <p class="text-sm items-center flex">{product?.rating}/5</p>
                </div>

                <div class="flex gap-4 pb-3 md:pb-5 border-b">
                    {#if finalPrice != null}
                        <p
                            class="font-semibold mt-4 text-base sm:text-lg md:text-xl lg:text-3xl"
                        >
                            ${finalPrice}
                        </p>
                    {:else}
                        <p class="text-sm text-gray-400 mt-4">
                            Select size to see price
                        </p>
                    {/if}
                </div>

                {#if product?.sizes?.length > 0}
                    <p class="text-xs md:text-sm text-gray-400 mt-2">
                        Select Size
                    </p>
                    <div
                        class="flex flex-wrap gap-3 border-b mt-3 pb-3 md:pb-5"
                    >
                        {#each product.sizes as size}
                            <button
                                type="button"
                                on:click={() => (selectedSize = size)}
                                class={`px-4 text-xs font-semibold sm:text-sm md:text-base ${selectedSize === size ? " bg-black text-white" : "bg-[#F0F0F0] text-[#606060]"} transition-all duration-300 rounded-3xl py-2`}
                            >
                                {size}
                            </button>
                        {/each}
                    </div>
                {/if}

                <div class="w-full mt-5 border rounded-3xl overflow-hidden">
                    <button
                        class="w-full text-left px-4 py-2 font-semibold bg-gray-100 flex justify-between"
                        on:click={toggle}
                    >
                        <span>Product Details</span>
                        <span>{isOpen ? "-" : "+"}</span>
                    </button>

                    {#if isOpen}
                        <div
                            transition:slide
                            class="px-4 py-3 text-gray-700 border-t"
                        >
                            {@html product?.description}
                        </div>
                    {/if}
                </div>

                <div class="flex gap-3">
                    <div
                        class="rounded-3xl w-[30%] bg-[#F0F0F0] px-10 mt-5 py-2"
                    >
                        <div class="w-full flex items-center justify-center">
                            <button
                                class="px-3 text-center font-bold text-lg"
                                on:click={() =>
                                    (quantity = Math.max(1, quantity - 1))}
                                >-</button
                            >
                            <p class="px-3 font-semibold text-lg">{quantity}</p>
                            <button
                                class="px-3 text-center font-bold text-lg"
                                on:click={() => (quantity = quantity + 1)}
                                >+</button
                            >
                        </div>
                    </div>

                    <div class="w-[70%]">
                        <button
                            on:click={addToCart}
                            class="rounded-3xl text-white cursor-pointer font-semibold py-2 mt-5 bg-black w-full"
                            >Add to Cart</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
{/key}

<SearchResultProduct results={relatedProducts} initialLimit={4} expandBy={10} />
<DetailsRatingfaq />
<UserReview />
<ByStyle />
