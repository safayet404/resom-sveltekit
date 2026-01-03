<script>
  import Icon from "@iconify/svelte";
  import Rating from "../common/Rating.svelte";

  import Loader from "../common/Loader.svelte";
  import toast from "svelte-french-toast";
  import { favorite } from "../../stores/favorite";

  let loading = false;

  export let item;

  function addToFavorite(item) {
    favorite.update((items) => {
      const index = items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        items.splice(index, 1);
        toast.success("Product removed from wishlist");
      } else {
        items.push({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
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
</script>

<section class="w-full mx-auto">
  <a
    href={`/product-details/${item.id}`}
    class="cursor-pointer group block relative rounded-b-[16px] rounded-t-[16px] border pb-4"
  >
    <div class="product-holder relative rounded-t-[16px]">
      <div class="">
        <img
          alt="product-img"
          class="w-full h-full rounded-t-[16px] object-contain"
          src={item?.image}
        />
      </div>

      <!-- Favorite & Cart Buttons -->
      <div class="absolute top-4 sm:top-6 right-3 sm:right-6 text-lg z-40 flex flex-col gap-2">
        <!-- Favorite -->

        <button
          type="button"
          class="top-2 right-3 text-lg z-10"
          on:click|preventDefault|stopPropagation={() => addToFavorite(item)}
          aria-label="Add to favorite"
        >
          {#if isInFavorite(item.id)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="#000"
            >
              <path
                d="M3.47933 13.0533L12 22L20.5207 13.0533C21.4679 12.0587 22 10.7098 22 9.30331C22 6.37437 19.7387 4 16.9492 4C15.6097 4 14.325 4.55874 13.3778 5.5533L12 7L10.6222 5.5533C9.67499 4.55874 8.39031 4 7.05077 4C4.2613 4 2 6.37437 2 9.30331C2 10.7098 2.53213 12.0587 3.47933 13.0533Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M3.47933 13.0533L12 22L20.5207 13.0533C21.4679 12.0587 22 10.7098 22 9.30331C22 6.37437 19.7387 4 16.9492 4C15.6097 4 14.325 4.55874 13.3778 5.5533L12 7L10.6222 5.5533C9.67499 4.55874 8.39031 4 7.05077 4C4.2613 4 2 6.37437 2 9.30331C2 10.7098 2.53213 12.0587 3.47933 13.0533Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        </button>
        <!-- Cart -->
        <button aria-label="Add to cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M8.89776 12.4706V8.23529C8.89776 5.8962 10.7344 4 13 4C15.2655 4 17.1022 5.8962 17.1022 8.23529V12.4706M7.05129 22H18.9487C20.1582 22 21.1052 20.9248 20.9906 19.6816L20.2092 11.211C20.1089 10.1241 19.2248 9.29412 18.1673 9.29412H7.83266C6.7752 9.29412 5.89105 10.1241 5.79079 11.211L5.00942 19.6816C4.89473 20.9249 5.84167 22 7.05129 22Z"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="px-4">
      <h2 class="capitalize text-xs mb-2 md:text-sm lg:text-base font-poppins mt-3 line-clamp-1">
        {item?.name}
      </h2>

      <div class="flex gap-3">
        <Rating rate={item?.rating} />
        <p class="text-xs items-center flex">{item.rating}/5</p>
      </div>

      <div class="flex font-poppins gap-4">
        {#if item?.discount}
          <p class="font-semibold text-sm sm:text-sm md:text-base lg:text-xl mt-2">
            ${item?.price}
          </p>
        {:else}
          <p class="font-semibold mt-2 text-xs sm:text-base md:text-base lg:text-xl text-black">
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
  </a>
</section>

<style>
  .product-holder {
    overflow: hidden;
    background: linear-gradient(to bottom, #eee9e5, #f5f5f5);
  }

  .product-holder:hover {
    background: linear-gradient(to bottom, #f5f5f5, #eee9e5);
  }

  .product-holder img {
    transition: transform 0.4s ease-in-out;
  }

  .product-holder:hover img {
    transform: scale(1.15);
  }
</style>
