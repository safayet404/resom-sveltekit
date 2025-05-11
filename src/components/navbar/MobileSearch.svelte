<script>
    import { goto } from "$app/navigation";

    let searchQuery = "";

    async function handleSearch(e) {
        e.preventDefault();

        if (searchQuery.trim()) {
            await goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }
</script>

<div class="lg:hidden flex container p-3 mx-auto">
    <form
        on:submit={handleSearch}
        class="border rounded-2xl flex items-center w-full"
    >
        <span class="material-icons my-auto p-1">search</span>
        <input
            placeholder="Search Items"
            class="my-auto outline-none flex-grow"
            bind:value={searchQuery}
        />
    </form>
</div>
