<script>
  import OfferSingle from "./OfferSingle.svelte";

  const data = [
    {
      id: 1,
      topTitle: "Bilges Offer Revealed",
      mainTitle: "More Deals Inside up to 25% Off",
      bgColor: "#EEEFEA",
      btnText: "Shop Now",
      btnLink: "/",
    },
    {
      id: 2,
      topTitle: "Bilges Offer Revealed",
      mainTitle: "Mans Deals Inside up to 25% Off",
      bgColor: "#E5E4E2",
      btnText: "Shop Now",
      btnLink: "/",
    },
  ];
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 section-padding-left section-padding-right">
  {#each data as item}
    <OfferSingle data={item} />
  {/each}
</div>
