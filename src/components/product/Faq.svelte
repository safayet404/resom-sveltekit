<script>
    let questions = [
        "Fabric Type",
        "Return Policy",
        "Shipping Time",
        "In Stock",
        "Pockets Included",
    ];

    let innerText = "";

    let selectedItems = [];
    let customValue = "";

    function appendQuestion(question) {
        if (customValue.trim() === "") {
            customValue = question;
        } else {
            customValue += `,${question}`;
        }
    }

    let accordions = [
        {
            title: "What is Resom, and what do you offer?",
            content:
                "Resom is a modern lifestyle brand offering high-quality apparel, accessories, and footwear for men, women, and kids. We focus on timeless designs, premium fabrics, and sustainable practices to keep you looking stylish and feeling comfortable. Let us know how we can help.",
        },
        {
            title: "Where are you located?",
            content: "Ships within 2–5 business days.",
        },
        {
            title: "What are your business hour",
            content: "30-day return window with free pickup.",
        },
    ];

    let openIndices = [];

    function toggle(index) {
        if (openIndices.includes(index)) {
            openIndices = openIndices.filter((i) => i !== index);
        } else {
            openIndices = [...openIndices, index];
        }
    }

    function sendMessage() {
        customValue = "";
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between">
    <div class="mt-10">
        <div class="w-full">
            <input
                bind:value={customValue}
                placeholder="Send a message the seller"
                class="p-3 w-[70%] border border-black rounded-lg"
            />
            <button
                on:click={sendMessage}
                class="bg-black text-white font-semibold p-3 rounded-lg"
                >Send</button
            >
        </div>

        <div class="flex flex-wrap space-x-2">
            {#each questions as item}
                <button
                    on:click={() => appendQuestion(item)}
                    class="p-3 mt-4 text-[#606060] bg-[#F3F3F3] rounded-lg"
                    >{item}</button
                >
            {/each}
        </div>
    </div>

    <div class="w-full mt-10">
        <h2 class="font-semibold text-lg underline mb-5">
            General Information
        </h2>

        {#each accordions as item, i}
            <div class="overflow-hidden border-b mb-2">
                <button
                    class="w-full text-left py-3 font-semibold flex justify-between"
                    on:click={() => toggle(i)}
                >
                    <span>{item.title}</span>
                    <span>{openIndices.includes(i) ? "-" : "+"}</span>
                </button>

                {#if openIndices.includes(i)}
                    <div
                        transition:slide
                        class="px-4 py-3 text-gray-700 border-t"
                    >
                        {item.content}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
