<script>
    import { slide } from "svelte/transition";
    import ByStyle from "../home/ByStyle.svelte";
    import Rating from "../common/Rating.svelte";
    import Faq from "./Faq.svelte";
    import Details from "./Details.svelte";
    import Review from "./Review.svelte";

    let activeTab = "rating";
    let tabs = [
        { name: "details", label: "Product Details" },
        { name: "rating", label: "Rating" },
        { name: "faq", label: "FAQ" },
    ];
</script>

<section class="container mx-auto p-4">
    <div class="grid grid-cols-3 gap-10">
        {#each tabs as tab}
            <button
                on:click={() => (activeTab = tab.name)}
                class={`text-center ${activeTab === tab.name ? "border-b border-black" : "border-none"} pb-3`}
            >
                {tab.label}
            </button>
        {/each}
    </div>
    {#if activeTab === "details"}
        <Details />
    {:else if activeTab === "faq"}
        <Faq />
    {:else if activeTab === "rating"}
        <Review />
    {/if}
</section>
