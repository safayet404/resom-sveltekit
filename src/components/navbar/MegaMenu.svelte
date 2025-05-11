<script>
    export let categories = [];
</script>

<div class="hidden lg:flex">
    <ul class="flex space-x-6 text-[#1F2224] text-sm font-semibold uppercase">
        {#each categories as category}
            <li class="relative group">
                <a
                    href={`/category/${category.slug}`}
                    class="flex items-center gap-1 uppercase"
                >
                    {category.name}
                    {#if category.children?.edges.length > 0}
                        <span class="material-icons">keyboard_arrow_down</span>
                    {/if}
                </a>

                {#if category.children.edges.length > 0}
                    <div
                        class="absolute top-full left-0 w-max rounded-md flex flex-wrap gap-10 p-6 bg-white shadow-lg z-50
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                    >
                        {#each category.children.edges
                            .slice()
                            .sort((a, b) => b.node.children.edges.length - a.node.children.edges.length) as { node: subcategory }}
                            <div>
                                <h3 class="text-gray-700 font-semibold mb-4">
                                    <a href={`/category/${subcategory.slug}`}
                                        >{subcategory.name}</a
                                    >
                                </h3>

                                <ul>
                                    {#each subcategory.children.edges as { node: subsub }}
                                        <li>
                                            <a
                                                class="block py-2 hover:underline text-sm"
                                                href={`/category/${subsub.slug}`}
                                            >
                                                {subsub.name}
                                            </a>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</div>
