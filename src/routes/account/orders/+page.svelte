<script>
    export let data;

    console.log("orders data", data.orders);

    const orders = data.orders;
</script>

<h1>My Orders</h1>
{#if orders.length}
    <div class="space-y-3">
        {#each orders as order}
            <div class="p-4 rounded-md bg-white space-y-3">
                {#each order.lines as line}
                    <div class="grid grid-cols-12 bg-[#EFEFEF] p-4 rounded-md">
                        <div class="col-span-2">
                            <img
                                src={line.variant.product.thumbnail.url}
                                alt="Thumbnail"
                            />
                            <!-- {#each order.lines as line}
                        {/each} -->
                        </div>
                        <div class="col-span-10 h-full">
                            <div class="flex flex-col justify-between h-full">
                                <!-- Top Content -->
                                <div class="flex justify-between">
                                    <div>
                                        <p class="text-2xl font-normal">
                                            {line.productName}
                                        </p>

                                        <p class="mt-3 text-gray-600">
                                            Product Size : {line.variant.name}
                                        </p>

                                        <p class="mt-3 text-[#1A1919]">
                                            Price: {line.unitPrice.gross.amount}
                                            {line.unitPrice.gross.currency}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="capitalize">
                                            {order.status}
                                        </p>
                                    </div>
                                </div>

                                <!-- Bottom Content -->
                                <div class="mt-6 flex justify-between">
                                    <div>
                                        <p
                                            class="underline text-sm font-semibold"
                                        >
                                            Purchase History
                                        </p>
                                    </div>

                                    <div class="flex flex-col gap-2">
                                        <button
                                            class="bg-black px-5 py-2 text-white rounded-3xl"
                                            >Buy Again</button
                                        >

                                        {#if order.status === "UNFULFILLED"}
                                            <button
                                                class="bg-transparent border border-gray-500 px-5 py-2 text-black rounded-3xl"
                                                >Cancel</button
                                            >
                                        {/if}
                                        {#if order.status === "FULFILLED"}
                                            <button
                                                class="bg-transparent border border-gray-500 px-5 py-2 text-black rounded-3xl"
                                                >Return/Refund</button
                                            >
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}

        <!-- {#each orders as order}
            <div class="p-4 rounded-md bg-white">
                <div class="grid grid-cols-12">
                    <div class="col-span-2"><h1>hello</h1></div>
                    <div class="col-span-10"></div>
                    <h2>Order #{order.number}</h2>
                    <p>Status: {order.status}</p>
                    <p>
                        Total: {order.total.gross.amount}
                        {order.total.gross.currency}
                    </p>

                    {#each order.lines as line}
                        <div class="product">
                            <img
                                src={line.variant.product.thumbnail.url}
                                alt="Thumbnail"
                            />
                            <p>{line.productName} - {line.variant.name}</p>
                            <p>Qty: {line.quantity}</p>
                            <p>
                                Price: {line.unitPrice.gross.amount}
                                {line.unitPrice.gross.currency}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        {/each} -->
    </div>
{:else}
    <p>No orders found.</p>
{/if}
