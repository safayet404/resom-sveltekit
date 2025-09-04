<script>
  import Icon from "@iconify/svelte";
  import { favorite } from "../../stores/favorite";
  import { _ } from "svelte-i18n";

  function deleteItem(id) {
    favorite.update((items) => items.filter((item) => item.id !== id));
  }
</script>

<svelte:head>
  <title>Wishlist</title>
  <meta name="description" content="Product Wishlist Page" />
</svelte:head>
<section class="container mx-auto p-4">
  {#if $favorite.length >= 1}
    <div class="grid grid-cols-1 mt-20">
      {#each $favorite as item}
        <div class="border rounded-2xl flex items-center gap-2 p-5 mb-4 w-full">
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
            <img class="w-20 h-20" src={item?.image} alt="product_image" />
            <div class="flex flex-col justify-between w-full">
              <div>
                <h1 class="font-medium text-sm md:text-lg">
                  {item?.name}
                </h1>

                <div class="flex font-poppins gap-4">
                  {#if item?.discount}
                    <p class="font-semibold text-sm sm:text-sm md:text-base lg:text-xl mt-2">
                      ${item?.price}
                    </p>
                  {:else}
                    <p
                      class="font-semibold mt-2 text-xs sm:text-base md:text-base lg:text-xl text-black"
                    >
                      ${item?.originalPrice}
                    </p>
                  {/if}

                  {#if item?.discount}
                    <div class="flex gap-5">
                      <p
                        class="font-semibold mt-2 text-xs sm:text-base md:text-base lg:text-xl text-[#FA2525] line-through"
                      >
                        ${item?.originalPrice}
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
  {:else}
    <div class="flex items-center justify-center flex-col text-center min-h-96 text-xl">
      <p class="text-2xl font-semibold">{$_("no_wishlist")}</p>
      <div class="mt-6">
        <a href="/" class="px-4 py-2 rounded-3xl text-white bg-black text-sm font-medium"
          >{$_("shopping")}</a
        >
      </div>
    </div>
  {/if}
</section>
