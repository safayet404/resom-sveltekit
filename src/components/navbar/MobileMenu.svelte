<script>
    import { fly } from "svelte/transition";

    export let isOpen = false;
    export let onClose = () => {};
    export let categories = [];

    let openCategory = null;
    let openSubcategory = null;

    function toggleCategory(slug) {
        openCategory = openCategory === slug ? null : slug;
        openSubcategory = null;
    }

    function toggleSubcategory(slug) {
        openSubcategory = openSubcategory === slug ? null : slug;
    }
</script>

{#if isOpen}
    <div
        transition:fly={{ x: -100, y: 0, duration: 300 }}
        class="fixed top-16 left-0 rounded-md h-full w-64 mt-4 bg-white shadow z-50 p-4"
    >
        <ul class="space-y-4 text-black">
            <div class="flex justify-end pb-3">
                <button on:click={onClose} class="text-base">✖</button>
            </div>

            {#each categories as category}
                <li>
                    <div class="flex justify-between items-center">
                        <a
                            href={`/category/${category.slug}`}
                            on:click={onClose}
                            class="font-semibold"
                        >
                            {category.name}
                        </a>
                        {#if category.children.edges.length > 0}
                            <button
                                on:click={() => toggleCategory(category.slug)}
                                class="text-xs"
                            >
                                {openCategory === category.slug ? "▲" : "▼"}
                            </button>
                        {/if}
                    </div>

                    {#if openCategory === category.slug}
                        <ul class="ml-4 mt-2 space-y-2 text-sm text-gray-700">
                            {#each category.children.edges as { node: subcategory }}
                                <li>
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <a
                                            href={`/category/${subcategory.slug}`}
                                            on:click={onClose}
                                        >
                                            {subcategory.name}
                                        </a>
                                        {#if subcategory.children.edges.length > 0}
                                            <button
                                                on:click={() =>
                                                    toggleSubcategory(
                                                        subcategory.slug,
                                                    )}
                                                class="text-xs"
                                            >
                                                {openSubcategory ===
                                                subcategory.slug
                                                    ? "▲"
                                                    : "▼"}
                                            </button>
                                        {/if}
                                    </div>

                                    {#if openSubcategory === subcategory.slug}
                                        <ul
                                            class="ml-4 mt-1 space-y-1 text-xs text-gray-600"
                                        >
                                            {#each subcategory.children.edges as { node: subsub }}
                                                <li>
                                                    <a
                                                        href={`/category/${subsub.slug}`}
                                                        on:click={onClose}
                                                    >
                                                        {subsub.name}
                                                    </a>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}
