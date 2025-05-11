<script>
    export let rate = 0;
</script>

<div class="flex">
    {#each Array(5) as _, index}
        {#if rate >= index + 1}
            <!-- Full Star -->
            <svg
                class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5"
                viewBox="0 0 24 24"
                fill="#FF7F00"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"
                />
            </svg>
        {:else if rate > index && rate < index + 1}
            <!-- Half Star -->
            <svg
                class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="half">
                        <stop offset="50%" stop-color="#FF7F00" />
                        <stop offset="50%" stop-color="#D3D3D3" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#half)"
                    d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"
                />
            </svg>
        {:else}
            <!-- Empty Star -->
            <svg
                class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5"
                viewBox="0 0 24 24"
                fill="#D3D3D3"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"
                />
            </svg>
        {/if}
    {/each}
</div>
