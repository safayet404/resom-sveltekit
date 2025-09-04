<script>
  export let categories = [];
</script>

<div class="hidden md:flex col-span-4">
  <ul class="flex space-x-8 text-[#1F2224] font-semibold uppercase">
    {#each categories as category}
      <li class="relative group hover:underline">
        <a
          href={`/category/${category.slug}`}
          class="flex items-center font-medium gap-1 my-auto md:text-[12px] lg:text-base uppercase"
        >
          {category.name}
          {#if category.children?.edges.length > 0}
            <span class="material-icons">keyboard_arrow_down</span>
          {:else}
            <span class="material-icons invisible">keyboard_arrow_down</span>
          {/if}
        </a>

        {#if category.children.edges.length > 0}
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 w-max rounded-md flex flex-wrap gap-10 p-10 bg-white shadow-lg z-50
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out
   
    overflow-x-auto
    "
          >
            {#each category.children.edges
              .slice()
              .sort((a, b) => b.node.children.edges.length - a.node.children.edges.length) as { node: subcategory }}
              <div>
                <h3 class="text-gray-700 font-semibold text-sm mb-4">
                  <a href={`/category/${subcategory.slug}`}>{subcategory.name}</a>
                </h3>

                <ul class="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {#each subcategory.children.edges as { node: subsub }}
                    <li class="py-1">
                      <a
                        class="hover:underline text-xs text-gray-500"
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
