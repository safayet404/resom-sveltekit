<script>
    import { slide } from "svelte/transition";
    import Rating from "../../../components/common/Rating.svelte";
    import { cart } from "../../../stores/cart";
    import DetailsRatingfaq from "../../../components/product/DetailsRatingfaq.svelte";
    import UserReview from "../../../components/product/UserReview.svelte";
    import ByStyle from "../../../components/home/ByStyle.svelte";

    export let data;

    const { product } = data;

    let selectedImage = product?.images[0];
    let selectedColor = product?.colors[0];
    let selectedSize = product?.sizes[0];
    let quantity = 1;
    let isOpen = false;

    let finalPrice = product?.discount
        ? product?.price - (product?.price * product?.discount).toFixed() / 100
        : product?.price;
    let priceBeforeDiscount = product?.price;

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
                // Same product, same color, same size → increase quantity
                items[index].quantity += quantity;
            } else {
                // Different variation → add new item
                items.push({
                    id: product.id,
                    name: product.name,
                    price: finalPrice,
                    priceDiscount: priceBeforeDiscount,
                    discount: product?.discount,
                    selectedColor,
                    selectedSize,
                    selectedImage,
                    quantity,
                });
            }

            return items;
        });
    }
</script>

<section class="container mx-auto p-4 mt-[40%] md:mt-[20%] lg:mt-[10%]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
                {#each product?.images as item}
                    <button
                        class="w-20 h-20 p-0 border rounded overflow-hidden"
                        type="button"
                        on:click={() => (selectedImage = item)}
                        aria-label="Select product image"
                    >
                        <img
                            src={item}
                            alt="product thumbnail"
                            class={`w-full h-full object-cover rounded-lg ${item === selectedImage ? "border border-black" : ""}  `}
                        />
                    </button>
                {/each}
            </div>
            <div class="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10">
                <img
                    class="w-full h-auto object-cover rounded-lg"
                    src={selectedImage}
                    alt="product_image"
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
                {#if product?.discount}
                    <p
                        class="font-semibold mt-4 font-poppins text-base sm:text-lg md:text-xl lg:text-3xl"
                    >
                        ${finalPrice}
                    </p>
                {:else}
                    <p
                        class="font-semibold mt-4 font-poppins text-base sm:text-lg md:text-xl lg:text-3xl"
                    >
                        ${product?.price}
                    </p>
                {/if}
                {#if product?.discount}
                    <p
                        class="font-semibold mt-4 text-base sm:text-lg md:text-xl lg:text-3xl text-gray-400 line-through"
                    >
                        ${product?.price}
                    </p>

                    <p
                        class="bg-[#FFEBEB] text-[#FF3333] mt-1 md:mt-5 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full"
                    >
                        - {product?.discount} %
                    </p>
                {/if}
            </div>

            <div>
                <p class="text-xs md:text-sm text-gray-400 mt-2">
                    Select Colors
                </p>
                <div class="flex gap-3 border-b pb-3 md:pb-5">
                    {#each product?.colors as color}
                        <button
                            type="button"
                            on:click={() => (selectedColor = color)}
                            class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all mt-3 duration-300"
                            style="
					background-color: {color};
					border-color: {color === 'white' ? 'black' : 'transparent'};
				"
                            aria-label={"Color " + color}
                        >
                            {#if selectedColor === color}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke={color === "white"
                                        ? "black"
                                        : "white"}
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
            <div>
                <p class="text-xs md:text-sm text-gray-400 mt-2">Select Size</p>
                <div class="flex flex-wrap gap-3 border-b mt-3 pb-3 md:pb-5">
                    {#each product?.sizes as size}
                        <button
                            type="button"
                            on:click={() => (selectedSize = size)}
                            class={`px-4 text-xs font-semibold sm:text-sm md:text-base ${selectedSize === size ? " bg-black text-white" : "bg-[#F0F0F0] text-[#606060] "} transition-all duration-300  rounded-3xl py-2`}
                        >
                            {size}
                        </button>
                    {/each}
                </div>
            </div>

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
                        class="px-4 py-3 text-gray-700 border-t transition-all duration-300"
                    >
                        {product?.description}
                    </div>
                {/if}
            </div>

            <div class="flex gap-3">
                <div class="rounded-3xl w-[30%] bg-[#F0F0F0] px-10 mt-5 py-2">
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
                            on:click={() => (quantity = quantity + 1)}>+</button
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

<DetailsRatingfaq />
<UserReview />
<ByStyle />
