<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { cart } from "../../../stores/cart";
  import { fixImageUrl } from "$lib/utils/fixImageUrl";
  import Rating from "../../../components/common/Rating.svelte";
  import toast from "svelte-french-toast";
  import { slide } from "svelte/transition";
  import DetailsRatingfaq from "../../../components/product/DetailsRatingfaq.svelte";
  import CommonProduct from "../../../components/home/CommonProduct.svelte";

  export let data;

  let product;
  let relatedProducts;

  let selectedImage = null;
  let bigImage = null;
  let selectedColor = null;
  let selectedSize = null;
  let quantity = 1;
  let openSection = null;
  let zipCode = "";

  $: hasSizes = product?.sizes?.length > 0;
  $: hasColors = availableColors?.length > 0;
  $: requiresSizeSelection = hasSizes;
  $: requiresColorSelection = hasColors;

  $: if (data?.product) {
    product = data.product;
    relatedProducts = data.relatedProducts;
    selectedSize = product?.sizes?.[0] ?? null;
    selectedImage = null;
    selectedColor = null;
    quantity = 1;
    openSection = null;
  }

  function normalize(val) {
    if (typeof val !== "string") return "";
    return val.toLowerCase().trim().replace(/\s+/g, "-");
  }

  $: availableColors = [
    ...new Set(
      product?.variantMap
        .filter((v) => {
          const sizes = v.attributes.size ?? v.attributes["shoe-size"];
          return !requiresSizeSelection || sizes?.includes(selectedSize);
        })
        .flatMap((v) => v.attributes.color ?? [])
        .filter(Boolean),
    ),
  ];

  $: if (
    (selectedSize || !requiresSizeSelection) &&
    availableColors.length > 0 &&
    selectedColor == null
  ) {
    selectedColor = availableColors[0];
  }

  $: if (!hasColors && selectedColor === null) {
    selectedColor = "N/A";
  }

  $: matchedVariant = product?.variantMap?.find((v) => {
    const sizes = v.attributes.size ?? v.attributes["shoe-size"];
    const colors = v.attributes.color;
    const sizeMatch = !requiresSizeSelection || (sizes && sizes.includes(selectedSize));
    const colorMatch = !requiresColorSelection || (colors && colors.includes(selectedColor));
    return sizeMatch && colorMatch;
  });

  $: console.log("media", product);
  $: {
    if (!selectedImage && matchedVariant?.media?.[0]) {
      bigImage = matchedVariant.media[0];
    } else if (selectedImage) {
      bigImage = selectedImage;
    } else {
      bigImage = product?.images?.[0] ?? null;
    }
  }

  $: finalPrice = matchedVariant?.price ?? product?.price ?? null;
  $: priceBeforeDiscount = matchedVariant?.originalPrice ?? product?.originalPrice ?? null;
  $: discount = matchedVariant?.discount ?? product?.discount ?? null;
  $: media = matchedVariant?.media ?? null;

  function toggle(section) {
    openSection = openSection === section ? null : section;
  }

  function addToCart() {
    let errorMessage = "";

    if (requiresSizeSelection && !selectedSize) {
      errorMessage = "Please select a size.";
    } else if (requiresColorSelection && !selectedColor) {
      errorMessage = "Please select a color.";
    } else if ((requiresSizeSelection || requiresColorSelection) && !matchedVariant?.id) {
      errorMessage = "Selected variant combination is unavailable.";
    }

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    const itemToAddVariantId = matchedVariant?.id ?? product.id;

    cart.update((items) => {
      const index = items.findIndex(
        (item) =>
          item.id === product.id &&
          (!requiresSizeSelection || item.selectedSize === selectedSize) &&
          (!requiresColorSelection || item.selectedColor === selectedColor),
      );

      const currentPrice = finalPrice;
      const currentPriceDiscount = priceBeforeDiscount;
      const currentDiscount = discount;

      if (index !== -1) {
        items[index].quantity += quantity;
        toast.success("Product quantity updated in cart");
      } else {
        items.push({
          id: product.id,
          variantId: itemToAddVariantId,
          name: product.name,
          price: currentPrice,
          priceDiscount: currentPriceDiscount,
          discount: currentDiscount,
          ...(requiresSizeSelection && { selectedSize }),
          ...(requiresColorSelection && { selectedColor }),
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
  <title>{product?.name}</title>
  <meta name="description" content="Product Details Page" />
</svelte:head>

{#if product}
  <section class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-4 lg:col-span-2">
          <div class="flex flex-wrap gap-2">
            {#each product?.images as item}
              <button
                class="w-20 h-20 p-0 border rounded overflow-hidden"
                on:click={() => (selectedImage = item)}
                aria-label="Select image"
              >
                <img
                  src={fixImageUrl(item)}
                  alt="thumbnail"
                  class={`w-full h-full object-cover rounded-lg ${
                    item === selectedImage ? "border border-black" : ""
                  }`}
                />
              </button>
            {/each}
          </div>
        </div>
        <div class="col-span-12 md:col-span-8 lg:col-span-10">
          <img
            class="w-full h-auto object-cover rounded-lg"
            src={fixImageUrl(bigImage)}
            alt="Product"
          />
        </div>
      </div>

      <div>
        <h2 class="text-3xl font-bold mt-2">{product?.name}</h2>
        <div class="flex gap-3 mt-2">
          <Rating rate={product?.rating} />
          <span class="text-sm">{product?.rating}/5</span>
        </div>

        <div class="mt-4 mb-4 flex gap-3">
          {#if finalPrice != null}
            <p class="text-2xl md:text-3xl font-semibold">${finalPrice}</p>
            {#if discount}
              <p class="text-2xl md:text-3xl font-semibold text-gray-400">
                <span class="line-through">${priceBeforeDiscount}</span>
              </p>
            {/if}
          {:else if !requiresSizeSelection && !requiresColorSelection}
            <p class="text-2xl md:text-3xl font-semibold">${product?.price}</p>
            {#if product?.discount}
              <p class="text-2xl md:text-3xl font-semibold text-gray-400">
                <span class="line-through">${product?.originalPrice}</span>
              </p>
            {/if}
          {:else}
            <p class="text-gray-400 text-sm">Select size and color to see price</p>
          {/if}
        </div>

        {#if hasSizes}
          <p class="text-sm text-gray-600">Select Size</p>
          <div class="flex flex-wrap gap-2 mt-2 mb-4">
            {#each product.sizes as size}
              <button
                on:click={() => {
                  selectedSize = size;
                  selectedColor = null;
                  selectedImage = null;
                }}
                class={`px-4 py-2 rounded-3xl text-sm font-medium ${
                  selectedSize === size ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {size}
              </button>
            {/each}
          </div>
        {/if}

        {#if hasColors}
          <p class="text-sm text-gray-600">Available Colors</p>
          <div class="flex flex-wrap gap-2 mt-2 mb-4">
            {#each availableColors as color}
              <button
                on:click={() => {
                  selectedColor = color;
                  selectedImage = null;
                }}
                class={`px-4 py-2 rounded-3xl text-sm font-medium ${
                  selectedColor === color ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {color}
              </button>
            {/each}
          </div>
        {/if}

        <div class="w-full mt-5 border rounded-3xl overflow-hidden">
          <button
            class="w-full text-left px-4 py-2 font-semibold bg-gray-100 flex justify-between"
            on:click={() => toggle("details")}
          >
            <span>Product Details</span>
            <span>{openSection === "details" ? "-" : "+"}</span>
          </button>
          {#if openSection === "details"}
            <div transition:slide class="px-4 py-3 text-gray-700 border-t">
              {@html product?.description}
            </div>
          {/if}
        </div>

        <div class="w-full mt-5 border rounded-3xl overflow-hidden">
          <button
            class="w-full text-left px-4 py-2 font-semibold bg-gray-100 flex justify-between"
            on:click={() => toggle("delivery")}
          >
            <span>Delivery or Pick Up in our store</span>
            <span>{openSection === "delivery" ? "-" : "+"}</span>
          </button>
          {#if openSection === "delivery"}
            <div transition:slide class="px-4 py-3 text-gray-700 border-t">
              <p class="text-[#6B7280] text-base font-medium">
                Calculate shipping and/or check the availability of the selected product in Dudalina
                stores:
              </p>

              <div class="flex gap-4 mt-5 mb-5">
                <input
                  bind:value={zipCode}
                  placeholder="Enter Your Zip Code"
                  class="p-2 rounded-3xl border border-gray-400"
                />

                <button
                  disabled={!zipCode.trim()}
                  class={`rounded-3xl font-bold  text-white px-5 py-2 ${zipCode.trim() ? "bg-black" : "bg-[#6B7280]"} `}
                  >Calculate
                </button>
              </div>

              <a class="underline font-medium" href="/">I don't know my zip code</a>

              <div class="mt-5">
                <h1 class="font-bold text-[#6B7280]">Economy</h1>
                <p>Within 15 business days R$11.90</p>
                <br />
                <h1 class="text-[#6B7280] font-bold">Normal</h1>
                <p>Within 15 business days R$11.90</p>
              </div>
            </div>
          {/if}
        </div>

        <div class="flex gap-3 mt-6">
          <div class="rounded-3xl bg-gray-100 px-6 py-2 flex items-center">
            <button on:click={() => (quantity = Math.max(1, quantity - 1))}>-</button>
            <p class="px-3">{quantity}</p>
            <button on:click={() => (quantity += 1)}>+</button>
          </div>
          <button
            on:click={addToCart}
            class="rounded-3xl bg-black text-white font-semibold px-6 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>

  <DetailsRatingfaq />
  <CommonProduct
    initialProducts={relatedProducts.product}
    initialPageInfo={relatedProducts.pageInfo}
    expandBy={10}
  />
{/if}
