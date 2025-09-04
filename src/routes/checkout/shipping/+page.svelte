<script>
  import { getShippingMethods, setShippingMethod } from "$lib/api/saleor";
  import { goto } from "$app/navigation";

  let shippingMethods = [];
  let selected = "";
  const token = localStorage.getItem("checkoutToken");

  async function loadShippingMethods() {
    if (!token) return;
    try {
      const data = await getShippingMethods(token);
      shippingMethods = data.checkout.availableShippingMethods || [];
      if (shippingMethods.length > 0) selected = shippingMethods[0].id;
    } catch (err) {
      alert("Failed to load shipping methods: " + err.message);
    }
  }

  async function confirmShipping() {
    if (!selected) return alert("Please select a shipping method");
    try {
      await setShippingMethod(token, selected);
      goto("/checkout/payment");
    } catch (err) {
      alert("Failed to set shipping method: " + err.message);
    }
  }

  loadShippingMethods();
</script>

<div class="mx-auto container p-4">
  <div class="mt-5">
    <h2 class="md:mt-28 text-3xl font-bold mb-10 lg:mt-20">Select Shipping Method</h2>
    {#if shippingMethods.length === 0}
      <p>No shipping methods available</p>
    {:else}
      {#each shippingMethods as method}
        <div class="flex w-full border p-2 rounded-md mt-2">
          <div class="flex justify-between w-full">
            <div>
              {method.name} - {method.price.amount}
              {method.price.currency}
            </div>
            <input type="radio" class="accent-black" bind:group={selected} value={method.id} />
          </div>
        </div>
      {/each}
      <button
        class="w-full block p-2 bg-black text-white mt-3 rounded-md"
        on:click={confirmShipping}>Continue</button
      >
    {/if}
  </div>
</div>
