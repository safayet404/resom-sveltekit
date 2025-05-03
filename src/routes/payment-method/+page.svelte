<script>
    export let data;
    const { subtotal, shipping, total } = data;

    const paymentMethods = [
        {
            id: 1,
            name: "credit",
            image: "/credit.png",
            label: "Credit",
        },
        {
            id: 2,
            name: "debit",
            image: "/debit.png",
            label: "Debit",
        },
        {
            id: 3,
            name: "boleto",
            image: "/boleto.png",
            label: "Boleto",
        },
        {
            id: 4,
            name: "pix",
            image: "/pix.png",
            label: "Pix",
        },
    ];

    let selectedPayment = "";

    function paymentOption() {
        goto(
            `/payment?subtotal=${subtotal}&shipping=${shipping}&total=${total}`,
        );
    }
</script>

<section class="mx-auto container p-4">
    <h1 class="uppercase text-gray-400 mt-20">Select payement method</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10">
        <div>
            {#each paymentMethods as method}
                <label
                    class="flex justify-between items-center p-3 border rounded-lg mb-2 cursor-pointer"
                >
                    <div class="flex items-center gap-2">
                        <img
                            src={method.image}
                            alt={method.label}
                            class="w-6 h-6"
                        />
                        <span>{method.label}</span>
                    </div>
                    <input
                        type="radio"
                        name="payment"
                        value={method.name}
                        bind:group={selectedPayment}
                        class="accent-black"
                    />
                </label>
            {/each}
        </div>
        <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7">
            <h1 class="font-bold text-lg text-center">Summary</h1>

            <div class="flex justify-between">
                <h1>Subtotal</h1>
                <h1 class="font-semibold">
                    ${subtotal}
                </h1>
            </div>
            <div class="flex justify-between border-b- pb-3">
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
                class={`block text-center px-4 w-full py-2 rounded-3xl text-lg font-poppins font-medium text-white transition duration-300 ${
                    selectedPayment
                        ? "bg-black"
                        : "bg-gray-400 pointer-events-none"
                }`}
            >
                {selectedPayment ? "Continue" : "Proceed to Pay"}
            </a>
        </div>
    </div>
</section>
