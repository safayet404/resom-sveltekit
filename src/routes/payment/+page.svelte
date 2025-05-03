<script>
    import { goto } from "$app/navigation";

    export let data;
    const { subtotal, shipping, total } = data;

    let cardNumber = "";
    let cardName = "";
    let expiryDate = "";
    let cvv = "";
    let saveCard = false;

    // Derived form validation
    $: formValid =
        cardNumber.trim() && cardName.trim() && expiryDate.trim() && cvv.trim();
</script>

<section class="mx-auto container p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10">
        <div>
            <div class="flex flex-col">
                <label class="text-sm mb-1" for="card-number"
                    >Card Number*</label
                >
                <input
                    id="card-number"
                    bind:value={cardNumber}
                    placeholder="Ex: 0000 0000 0000 0000"
                    class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"
                />
            </div>
            <div class="flex flex-col mt-5">
                <label class="text-sm mb-1" for="card-name">Name on card*</label
                >
                <input
                    id="card-name"
                    bind:value={cardName}
                    placeholder="Ex: Brooklyn Simmons"
                    class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"
                />
            </div>
            <div class="flex justify-between gap-5">
                <div class="flex flex-col mt-5 w-full">
                    <label class="text-sm mb-1" for="expiry">Expiry Date*</label
                    >
                    <input
                        id="expiry"
                        bind:value={expiryDate}
                        placeholder="MM/YY"
                        class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"
                    />
                </div>
                <div class="flex flex-col mt-5 w-full">
                    <label class="text-sm mb-1" for="cvv">CVV*</label>
                    <input
                        id="cvv"
                        bind:value={cvv}
                        placeholder="CVV"
                        class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"
                    />
                </div>
            </div>
            <div class="flex gap-2 mt-5">
                <input
                    class="accent-black"
                    type="checkbox"
                    bind:checked={saveCard}
                />
                <h1 class="font-poppins text-lg">Save Card</h1>
            </div>
        </div>

        <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7">
            <h1 class="font-bold text-lg text-center">Summary</h1>

            <div class="flex justify-between">
                <h1>Subtotal</h1>
                <h1 class="font-semibold">${subtotal}</h1>
            </div>
            <div class="flex justify-between border-b pb-3">
                <h1>Estimated Shipping & Handling</h1>
                <p class="font-bold">
                    {shipping == "0" ? "FREE" : `$${shipping}`}
                </p>
            </div>

            <div class="flex justify-between">
                <h1>Total</h1>
                <h1 class="font-semibold">${total}</h1>
            </div>

            <a
                href={`/payment?subtotal=${subtotal}&shipping=${shipping}&total=${total}`}
                class={`block text-center px-4 w-full py-2 rounded-3xl text-lg font-poppins font-medium text-white ${
                    formValid ? "bg-black" : "bg-gray-400 pointer-events-none"
                } transition duration-300`}
            >
                Order Confirm
            </a>
        </div>
    </div>
</section>
