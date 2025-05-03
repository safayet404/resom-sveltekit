<script>
    import Icon from "@iconify/svelte";
    import { favorite } from "../../stores/favorite";

    function deleteItem(id) {
        favorite.update((items) => items.filter((item) => item.id !== id));
    }
</script>

<section class="container mx-auto p-4">
    <div class="grid grid-cols-1 mt-20">
        {#each $favorite as item}
            <div
                class="border rounded-2xl flex items-center gap-2 p-5 mb-4 w-full"
            >
                <div>
                    <button
                        aria-label="Delete item"
                        on:click={() => deleteItem(item?.id)}
                        class="text-lg text-red-600"
                    >
                        <Icon icon="material-symbols:delete" />
                    </button>
                </div>
                <div class="flex gap-3 w-full">
                    <img
                        class="w-20 h-20"
                        src={item?.image}
                        alt="product_image"
                    />
                    <div class="flex flex-col justify-between w-full">
                        <div>
                            <h1 class="font-medium text-sm md:text-lg">
                                {item?.name}
                            </h1>

                            <div class="flex font-poppins gap-4">
                                {#if item?.discount}
                                    <p
                                        class="font-semibold text-base md:text-xl mt-2"
                                    >
                                        ${item?.price -
                                            (
                                                (item.price * item.discount) /
                                                100
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
                        </div>

                        <div class="flex justify-end mt-auto">
                            <a
                                class="px-4 py-1 rounded-3xl text-white bg-black"
                                href={`/product-details/${item?.id}`}>Buy Now</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
