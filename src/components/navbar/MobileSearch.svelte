<script>
  import lodash from "lodash";
  const { debounce } = lodash;
  import { goto } from "$app/navigation";
  import { fixImageUrl } from "$lib/utils/fixImageUrl";

  let searchQuery = "";
  let searchResults = [];
  let showDropdown = false;

  // Debounced API call
  const fetchSearchResults = debounce(async (query) => {
    if (!query.trim()) {
      searchResults = [];
      showDropdown = false;
      return;
    }

    try {
      const res = await fetch("/api/live-search?q=" + encodeURIComponent(query));
      const data = await res.json();
      searchResults = data.hits || [];
      showDropdown = true;
    } catch (err) {
      console.error("Live search failed", err);
      searchResults = [];
    }
  }, 300);

  function handleInput(e) {
    searchQuery = e.target.value;
    fetchSearchResults(searchQuery);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      await goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      showDropdown = false;
    }
  }

  function handleSelect(id) {
    goto(`/product-details/${id}`);
    showDropdown = false;
  }

  function handleBlur() {
    // Delay to allow click event on result
    setTimeout(() => (showDropdown = false), 200);
  }

  let searchInput;

  function focusInput() {
    searchInput.focus();
  }
</script>

<section class="flex justify-center items-center w-full md:hidden mb-2 px-5">
  <div class="relative w-full">
    <form
      on:submit={handleSearch}
      class="flex items-center w-full border rounded-3xl px-3 h-9 bg-white"
    >
      <button
        type="button"
        on:click={focusInput}
        class="text-2xl cursor-pointer bg-transparent border-none p-0 m-0"
        aria-label="Focus search input"
      >
        <!-- SVG search icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M11.2279 3.24999C10.1725 3.23769 9.12512 3.43494 8.14651 3.83031C7.16789 4.22569 6.27746 4.81132 5.52679 5.55328C4.77613 6.29525 4.18016 7.1788 3.77342 8.15274C3.36667 9.12668 3.15723 10.1717 3.15723 11.2271C3.15723 12.2826 3.36667 13.3276 3.77342 14.3015C4.18016 15.2754 4.77613 16.159 5.52679 16.901C6.27746 17.6429 7.16789 18.2285 8.14651 18.6239C9.12512 19.0193 10.1725 19.2165 11.2279 19.2042C13.3274 19.1798 15.3327 18.3286 16.8087 16.8352C18.2848 15.3419 19.1126 13.3268 19.1126 11.2271C19.1126 9.12741 18.2848 7.11236 16.8087 5.61902C15.3327 4.12568 13.3274 3.27446 11.2279 3.24999Z"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
          />
          <path
            d="M17.1787 17.1795L22.7503 22.7511"
            stroke="black"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <input
        bind:value={searchQuery}
        placeholder="Type your search "
        class="outline-none bg-transparent flex-grow pl-4 text-sm"
        on:input={handleInput}
        on:blur={handleBlur}
        on:focus={() => searchQuery && (showDropdown = true)}
        bind:this={searchInput}
      />
    </form>

    {#if showDropdown && searchResults.length > 0}
      <div
        class="absolute z-50 bg-white shadow rounded mt-2 w-full border max-h-[500px] overflow-auto"
      >
        <p class="text-xs font-bold px-3 pt-2 text-gray-500">Products</p>

        {#each searchResults as item (item.id)}
          <div
            role="button"
            tabindex="0"
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect();
            }}
            class="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
            on:click={() => handleSelect(item.id)}
          >
            <div class="flex items-center gap-2">
              <img
                src={fixImageUrl(item.media?.[0]?.url)}
                alt={item.name}
                class="w-10 h-10 rounded border"
              />
              <div>
                <p class="text-sm font-semibold">{item.name}</p>
                <p class="text-xs text-gray-500">
                  {item.category?.name}
                </p>
              </div>
            </div>

            <div>
              <p class="text-sm font-bold text-pink-600">
                ${item.pricing?.priceRange?.start?.gross?.amount}
              </p>
            </div>
          </div>
        {/each}

        <div
          role="button"
          tabindex="0"
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSelect();
          }}
          class="sticky bottom-0 text-center text-white font-medium bg-black py-2 text-sm cursor-pointer"
          on:click={handleSearch}
        >
          View all results for “{searchQuery}”
        </div>
      </div>
    {/if}
  </div>
</section>
