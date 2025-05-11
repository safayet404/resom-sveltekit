<script>
    import Icon from "@iconify/svelte";
    import { cart } from "../../stores/cart";
    import { goto } from "$app/navigation";

    $: totalPrice = $cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    $: discountedTotal = totalPrice - (totalPrice * discount) / 100;

    let coupon = "";
    let discount = 0;
    let couponError = "";

    console.log("cart", $cart);

    $: effectiveTotal = couponApplied ? discountedTotal : totalPrice;
    $: deliveryChargeFinal = effectiveTotal > 1000 ? 0 : 10;
    $: finalTotal = (effectiveTotal + deliveryChargeFinal).toFixed(2);

    let couponApplied = false;

    const validCoupons = {
        SAVE10: 10, // 10% off
        FREESHIP: 5, // 5% off
        A: 8,
    };

    let deliveryCharge = 10;

    function deleteItem(id) {
        cart.update((items) => items.filter((item) => item.id !== id));
    }

    function proceedToPay() {
        goto(
            `/payment-method?subtotal=${effectiveTotal}&shipping=${deliveryChargeFinal}&total=${finalTotal}`,
        );
    }
</script>

<svelte:head>
    <title>Cart</title>
    <meta name="description" content="This is cart page" />
</svelte:head>

<section class="container mx-auto p-4">
    <div class=" mt-20 sm:mt-16 flex justify-between">
        <h1 class="text-gray-400 uppercase">Cart Item(s)</h1>
    </div>
    {#if $cart.length >= 1}
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10">
            <div>
                {#each $cart as item}
                    <div
                        class="flex items-center gap-3 mb-2 border p-3 rounded-lg"
                    >
                        <div class="col-span-1">
                            <button
                                aria-label="Delete item"
                                on:click={() => deleteItem(item?.id)}
                                class="text-lg text-red-600"
                            >
                                <Icon icon="material-symbols:delete" />
                            </button>
                        </div>
                        <div class="flex gap-20">
                            <img
                                class="w-20 h-20"
                                src={item?.thumbnail}
                                alt="product_image"
                            />
                            <div>
                                <div>
                                    <h1 class="font-medium text-sm md:text-lg">
                                        {item?.name}
                                    </h1>
                                    <h2
                                        class="text-xs md:text-sm capitalize text-gray-600"
                                    >
                                        Size : {item?.selectedSize} &nbsp; &nbsp;
                                        Color :
                                        {item?.selectedColor}
                                    </h2>
                                </div>
                                <div class="flex gap-2">
                                    <p
                                        class="font-medium font-poppins text-xs md:text-sm"
                                    >
                                        ${item?.price}
                                    </p>

                                    {#if item?.discount}
                                        <p
                                            class="font-medium text-xs md:text-sm text-gray-400 line-through"
                                        >
                                            ${item?.priceDiscount}
                                        </p>
                                    {/if}
                                </div>

                                <div class="flex justify-start mt-3">
                                    <div
                                        class="flex items-center bg-[#F0F0F0] rounded-2xl"
                                    >
                                        <button
                                            class="px-3 text-center font-bold text-lg"
                                            on:click={() =>
                                                (item.quantity = Math.max(
                                                    1,
                                                    item.quantity - 1,
                                                ))}
                                        >
                                            -
                                        </button>
                                        <p class="px-3 font-medium text-sm">
                                            {item.quantity}
                                        </p>
                                        <button
                                            class="px-3 text-center font-bold text-lg"
                                            on:click={() =>
                                                (item.quantity += 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7">
                <h1 class="font-bold text-lg text-center">Summary</h1>

                {#if couponApplied}
                    <div class="flex gap-2">
                        <p class="text-xl my-auto"><Icon icon="ei:check" /></p>
                        <div class="flex justify-between w-full">
                            <di>
                                <h1>
                                    <span class="font-bold uppercase text-lg"
                                        >{coupon}</span
                                    > Applied
                                </h1>
                                <h2 class="text-xs text-red-600">
                                    - ${(totalPrice *
                                        validCoupons[coupon.toUpperCase()]) /
                                        100} ( {validCoupons[
                                        coupon.toUpperCase()
                                    ]}% off )
                                </h2>
                            </di>
                            <div>
                                <button
                                    on:click={() => (
                                        (couponApplied = false), (coupon = "")
                                    )}
                                    class="px-4 py-2 rounded-3xl bg-black text-white"
                                    >Remove</button
                                >
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="w-full flex gap-3">
                        <input
                            bind:value={coupon}
                            placeholder="Enter Coupon"
                            class="w-[70%] border border-black outline-none bg-transparent py-2 px-4 rounded-3xl"
                            type="text"
                        />

                        <button
                            on:click={() => {
                                if (validCoupons[coupon.toUpperCase()]) {
                                    discount =
                                        validCoupons[coupon.toUpperCase()];
                                    couponApplied = true;
                                    couponError = "";
                                } else {
                                    discount = 0;
                                    couponApplied = false;
                                    couponError = "You entered an invalid code";
                                }
                            }}
                            disabled={!coupon.trim()}
                            class={`w-[30%] rounded-3xl ${
                                coupon.trim() ? "bg-black" : "bg-gray-600"
                            } text-white px-4`}
                        >
                            Apply
                        </button>
                    </div>
                {/if}

                <div class="text-red-600 text-xs">
                    {couponError}
                </div>

                <div class="flex justify-between">
                    <h1>Subtotal</h1>
                    <h1 class="font-semibold">
                        ${effectiveTotal}
                    </h1>
                </div>
                <div class="flex justify-between border-b pb-3">
                    <h1>Estimated Shipping & Handling</h1>
                    <h1
                        class={`font-semibold ${deliveryChargeFinal === 0 ? "text-red-600" : ""}`}
                    >
                        {deliveryChargeFinal === 0
                            ? "Free"
                            : `$${deliveryChargeFinal}`}
                    </h1>
                </div>

                <div class="flex justify-between">
                    <h1>Total</h1>
                    <h1 class="font-semibold">${finalTotal}</h1>
                </div>

                <button
                    on:click={proceedToPay}
                    class="px-4 w-full py-2 rounded-3xl bg-black text-lg font-poppins font-medium text-white"
                    >Process to pay</button
                >
            </div>
        </div>
    {:else}
        <div class="mx-auto text-center mt-5 text-xl">
            <p>No items in the cart</p>
            <a
                href="/"
                class="px-4 py-2 rounded-3xl text-white bg-black text-sm font-medium mt-5"
                >Go Shopping</a
            >
        </div>
    {/if}
</section>
