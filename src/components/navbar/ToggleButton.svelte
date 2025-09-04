<script>
  import { fly, slide } from "svelte/transition";

  export let isMenuOpen;
  export let toggleMenu;
</script>

<div class="flex justify-start md:hidden">
  <button on:click={toggleMenu} class="btn btn-square btn-ghost" aria-label="Toggle menu">
    <!-- {#if isMenuOpen}
            ✖
        {:else}
            ☰
        {/if} -->

    {#if !isMenuOpen}
      <h1 class="text-2xl">☰</h1>
    {/if}
  </button>
</div>
