<!-- src/routes/cart/+page.svelte or similar -->
<script>
    import { createCheckout } from "$lib/saleor/order";
    import { onMount } from "svelte";

    let cart = [
        {
            variantId: "UHJvZHVjdFZhcmlhbnQ6MzQ4",
            quantity: 1,
        },
    ];

    let userEmail = "";
    let checkoutToken = null;
    let error = null;

    async function handleCheckout() {
        const response = await createCheckout(userEmail, cart, "channel-pln");

        if (response.errors.length) {
            error = response.errors.map((e) => e.message).join(", ");
        } else {
            checkoutToken = response.checkout.token;
            localStorage.setItem("checkoutToken", checkoutToken);
            // Optionally, navigate to a checkout page
            // goto('/checkout');
        }
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="mt-[55%] pt-[25%]">Your Cart</h1>

    {#each cart as item}
        <p class="mt-20">
            Variant: {item.variantId} | Quantity: {item.quantity}
        </p>
    {/each}

    <input type="email" bind:value={userEmail} placeholder="Your email" />

    <button on:click={handleCheckout}>Start Checkout</button>

    {#if error}
        <p style="color: red">{error}</p>
    {/if}
</div>
