<script>
  import { onMount } from "svelte";
  import { cart } from "../../stores/cart";
  import { goto } from "$app/navigation";
  import {
    createCheckout,
    applyVoucherToCheckout,
    removeVoucherFromCheckout,
    getCheckoutDetails,
    updateCheckoutLines,
  } from "$lib/api/saleor";
  import LoginModal from "../../components/auth/LoginModal.svelte";
  import Icon from "@iconify/svelte";
  import { defaultChannel, getProfile } from "$lib/saleor/auth";
  import { get } from "svelte/store";
  import { user } from "../../stores/auth";

  $: email = $user?.email;

  let isLoginOpen = false;
  let fullCart = [];
  let saleorCart = [];
  let coupon = "";
  let couponError = "";
  let isLoading = false;
  let checkoutId = null;
  let checkoutToken = null;

  let saleorVoucherDiscount = 0;
  let saleorAutoDiscount = 0;
  let saleorVoucherCode = null;
  let saleorShippingPrice = 0;

  $: fullCart = $cart;
  $: subtotalPrice = fullCart.reduce((total, item) => total + item.price * item.quantity, 0);

  $: saleorAutoDiscount = 0;

  let effectiveAutoDiscount = 0;
  let totalPrice = 0;

  $: {
    effectiveAutoDiscount = saleorVoucherDiscount === 0 ? saleorAutoDiscount : 0;
    totalPrice =
      subtotalPrice - saleorVoucherDiscount - effectiveAutoDiscount + saleorShippingPrice;
  }

  $: saleorCart = fullCart.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));

  onMount(async () => {
    const raw = localStorage.getItem("cart");
    if (raw) {
      try {
        cart.set(JSON.parse(raw));
      } catch {
        localStorage.removeItem("cart");
      }
    }

    const storedCheckoutToken = localStorage.getItem("checkoutToken");
    if (storedCheckoutToken) {
      checkoutToken = storedCheckoutToken;
      await fetchAndUpdateCheckoutDetails();
    }

    if (!checkoutToken) {
      await createOrUpdateCheckout();
    }
  });

  function deleteItem(id) {
    cart.update((items) => items.filter((item) => item.id !== id));
    scheduleCheckoutUpdate();
  }

  async function decreaseQuantity(id) {
    cart.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
      ),
    );
    scheduleCheckoutUpdate();
  }

  async function increaseQuantity(id) {
    cart.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
    scheduleCheckoutUpdate();
  }

  function resetVoucherUI() {
    coupon = "";
    couponError = "";
    saleorVoucherDiscount = 0;
    saleorVoucherCode = null;
  }

  let updateTimeout;
  function scheduleCheckoutUpdate() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => updateCheckoutWithCurrentCart(), 300);
  }

  async function updateCheckoutWithCurrentCart() {
    if (!checkoutToken || isLoading) return;
    try {
      const filteredCart = saleorCart.filter((line) => line.variantId && line.quantity > 0);

      if (filteredCart.length === 0) {
        localStorage.removeItem("checkoutToken");
        checkoutId = null;
        checkoutToken = null;
        resetVoucherUI();
        saleorAutoDiscount = 0;
        return;
      }

      await updateCheckoutLines(checkoutToken, filteredCart);
      await fetchAndUpdateCheckoutDetails();
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchAndUpdateCheckoutDetails() {
    if (!checkoutToken) return;
    isLoading = true;
    try {
      const checkout = await getCheckoutDetails(checkoutToken);

      if (checkout && checkout.id) {
        checkoutId = checkout.id;
        saleorShippingPrice = checkout.shippingPrice?.gross?.amount || 0;

        if (checkout.discount && checkout.voucherCode) {
          saleorVoucherDiscount = checkout.discount.amount;
          saleorVoucherCode = checkout.voucherCode;
          coupon = saleorVoucherCode;
        } else {
          resetVoucherUI();
        }

        if (checkout.discount && !checkout.voucherCode) {
          saleorAutoDiscount = checkout.discount.amount;
        }
      } else {
        localStorage.removeItem("checkoutToken");
        checkoutId = null;
        checkoutToken = null;
        resetVoucherUI();
        saleorAutoDiscount = 0;
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function applyCoupon() {
    if (!coupon.trim()) {
      couponError = "Enter a voucher code.";
      return;
    }
    isLoading = true;
    couponError = "";
    try {
      if (!checkoutId || !checkoutToken) await createOrUpdateCheckout();
      const res = await applyVoucherToCheckout(checkoutId, coupon.trim());

      if (res.errors && res.errors.length > 0) {
        couponError = res.errors.map((e) => e.message).join(", ");
        resetVoucherUI();
      } else if (res.checkout) {
        saleorVoucherDiscount = res.checkout.discount?.amount || 0;
        saleorVoucherCode = res.checkout.voucherCode || coupon.trim();
      }
    } catch (e) {
      couponError = e.message || "Failed to apply voucher";
      resetVoucherUI();
    } finally {
      isLoading = false;
    }
  }

  async function removeVoucher() {
    if (!checkoutId || !saleorVoucherCode) return;
    isLoading = true;
    try {
      const res = await removeVoucherFromCheckout(checkoutId, saleorVoucherCode);
      if (!res.errors || res.errors.length === 0) resetVoucherUI();
      else couponError = "Failed to remove voucher";
    } catch {
      couponError = "Failed to remove voucher";
    } finally {
      isLoading = false;
    }
  }

  async function createOrUpdateCheckout() {
    isLoading = true;
    const filteredCart = saleorCart.filter((line) => line.variantId && line.quantity > 0);
    if (filteredCart.length === 0) {
      isLoading = false;
      return null;
    }
    if (!email) {
      isLoading = false;
      return null;
    }
    try {
      const res = await createCheckout(email, filteredCart, defaultChannel);
      if (res.errors && res.errors.length > 0) {
        alert("Checkout error: " + res.errors.map((e) => e.message).join(", "));
        return null;
      }
      const checkout = res.checkout;
      checkoutId = checkout.id;
      checkoutToken = checkout.token;
      localStorage.setItem("checkoutToken", checkout.token);
      saleorShippingPrice = checkout.shippingPrice?.gross?.amount || 0;
      resetVoucherUI();
      return checkout;
    } catch (e) {
      console.error(e);
      localStorage.removeItem("checkoutToken");
      checkoutId = null;
      checkoutToken = null;
      return null;
    } finally {
      isLoading = false;
    }
  }

  async function startCheckoutProcess() {
    isLoading = true;
    try {
      let checkout = checkoutToken ? await getCheckoutDetails(checkoutToken) : null;
      if (!checkout) checkout = await createOrUpdateCheckout();
      if (checkout && checkout.id) {
        goto("/checkout/address");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to proceed to checkout");
    } finally {
      isLoading = false;
    }
  }

  function openLoginModal() {
    isLoginOpen = true;
  }
</script>

<div class="mx-auto container p-4">
  <div class="mt-5">
    <div class="md:mt-28 lg:mt-20 sm:mt-16 flex justify-between">
      <h1 class="text-gray-400 uppercase">Cart Item(s) - {$cart.length}</h1>
    </div>

    {#if fullCart.length > 0}
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10">
        <!-- Left side: Cart items -->
        <div class="space-y-2">
          {#each fullCart as item}
            <div class="flex items-center gap-3 mb-2 border p-3 rounded-lg">
              <button on:click={() => deleteItem(item.id)} class="text-lg text-red-600">
                <Icon icon="material-symbols:delete" />
              </button>
              <div class="flex gap-20">
                <img class="w-20 h-20" src={item.thumbnail} alt="product_image" />
                <div>
                  <h1 class="font-medium text-sm md:text-lg">{item.name}</h1>
                  <h2 class="text-xs md:text-sm text-gray-600">
                    {#if item?.selectedSize}Size: {item.selectedSize}{/if}
                    {#if item?.selectedColor}&nbsp;Color: {item.selectedColor}{/if}
                  </h2>
                  <div class="flex gap-2">
                    <p class="font-medium text-sm">${item.price}</p>
                    {#if item.discount}
                      <p class="text-gray-400 line-through text-sm">
                        ${item.priceDiscount}
                      </p>
                    {/if}
                  </div>
                  <div class="flex mt-3">
                    <div class="flex items-center bg-[#F0F0F0] rounded-2xl">
                      <button class="px-3 font-bold" on:click={() => decreaseQuantity(item.id)}
                        >-</button
                      >
                      <p class="px-3 font-medium text-sm">{item.quantity}</p>
                      <button class="px-3 font-bold" on:click={() => increaseQuantity(item.id)}
                        >+</button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Right side: Summary -->
        <div>
          <div class="bg-[#F0EFED] rounded-xl p-5 space-y-7">
            <h1 class="text-gray-500">Zip Code</h1>
            <form class="w-full flex gap-3">
              <input
                placeholder="Enter Zip Code"
                class="w-[70%] border border-black outline-none bg-transparent py-2 px-4 rounded-3xl disabled:opacity-50"
                type="text"
              />
              <button
                type="submit"
                class="w-[30%] rounded-3xl bg-black text-white px-4 disabled:opacity-50"
                >Calculate</button
              >
            </form>

            <div class="flex justify-between">
              <div class="flex gap-5">
                <input class="accent-black" type="radio" />

                <div>
                  <h1 class="text-black font-semibold">Economy</h1>
                  <p class="text-gray-400">Within 15 business days</p>
                </div>
              </div>
              <div>$11.90</div>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-5">
                <input class="accent-black" type="radio" />

                <div>
                  <h1 class="text-black font-semibold">Normal</h1>
                  <p class="text-gray-400">Within 11 business days</p>
                </div>
              </div>
              <div>$11.90</div>
            </div>
          </div>
          <div class="bg-[#F0EFED] rounded-xl p-5 space-y-7 mt-10">
            <h1 class="font-bold text-lg text-center">Summary</h1>

            <!-- Voucher section (toggle, not if/else) -->
            <div class={saleorVoucherCode && saleorVoucherDiscount > 0 ? "hidden" : ""}>
              <form class="w-full flex gap-3" on:submit|preventDefault={applyCoupon}>
                <input
                  bind:value={coupon}
                  placeholder="Enter voucher code"
                  disabled={isLoading}
                  class="w-[70%] border border-black outline-none bg-transparent py-2 px-4 rounded-3xl disabled:opacity-50"
                  type="text"
                />
                <button
                  type="submit"
                  disabled={!coupon.trim() || isLoading}
                  class="w-[30%] rounded-3xl {coupon.trim() && !isLoading
                    ? 'bg-black'
                    : 'bg-gray-600'} text-white px-4 disabled:opacity-50"
                  >{isLoading ? "..." : "Apply"}</button
                >
              </form>
              {#if couponError}
                <div class="text-red-600 text-xs">{couponError}</div>
              {/if}
            </div>

            <div class={saleorVoucherCode && saleorVoucherDiscount > 0 ? "" : "hidden"}>
              <div class="flex gap-2">
                <p class="text-xl my-auto text-green-600"><Icon icon="ei:check" /></p>
                <div class="flex justify-between w-full">
                  <div>
                    <h1><span class="font-bold uppercase">{saleorVoucherCode}</span> Applied</h1>
                    <h2 class="text-xs text-green-600">-${saleorVoucherDiscount.toFixed(2)}</h2>
                  </div>
                  <button
                    on:click={removeVoucher}
                    disabled={isLoading}
                    class="px-4 py-2 rounded-3xl bg-red-600 text-white disabled:opacity-50"
                    >{isLoading ? "..." : "Remove"}</button
                  >
                </div>
              </div>
            </div>

            <!-- Prices -->
            <div class="flex justify-between">
              <h1>Subtotal</h1>
              <h1 class="font-semibold">${subtotalPrice.toFixed(2)}</h1>
            </div>

            {#if saleorVoucherDiscount === 0}
              {#if effectiveAutoDiscount > 0}
                <div class="flex justify-between text-green-600">
                  <h1>Order Discount</h1>
                  <h1 class="font-semibold">-${effectiveAutoDiscount.toFixed(2)}</h1>
                </div>
              {/if}
            {/if}

            {#if saleorVoucherCode && saleorVoucherDiscount > 0}
              <div class="flex justify-between text-green-600">
                <h1>Voucher Discount</h1>
                <h1 class="font-semibold">-${saleorVoucherDiscount.toFixed(2)}</h1>
              </div>
            {/if}

            <div class="flex justify-between border-b pb-3">
              <h1>Shipping</h1>
              <h1 class="text-red-600 font-semibold">Will Calculate in Next Step</h1>
            </div>

            <div class="flex justify-between">
              <h1 class="font-bold">Total</h1>
              <h1 class="font-bold text-lg">${totalPrice.toFixed(2)}</h1>
            </div>

            {#if email}
              <button
                on:click={startCheckoutProcess}
                disabled={isLoading}
                class="px-4 w-full py-2 rounded-3xl bg-black text-lg font-medium text-white {isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''}"
              >
                {#if isLoading}Processing...{:else}Proceed to Checkout{/if}
              </button>
            {:else}
              <button
                disabled
                class="px-4 w-full py-2 rounded-3xl bg-[#D9D9D9] text-lg font-medium text-white"
                >Proceed to Checkout</button
              >
              <button on:click={openLoginModal} class="text-red-600 text-center mx-auto block"
                >Please <span class="underline">log in</span> first</button
              >
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <p class="mt-4 text-gray-500 text-center">Your cart is empty</p>
    {/if}
  </div>
</div>

<LoginModal isOpen={isLoginOpen} close={() => (isLoginOpen = false)} />
