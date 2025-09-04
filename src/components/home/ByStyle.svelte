<script>
  const style = [
    { id: 1, name: "Casual", slug: "casual", image: "/11.png", bg: "#F2F1EF" },
    { id: 2, name: "Formal", slug: "formal", image: "/formal.png", bg: "#E9E9E9" },
    { id: 3, name: "Party", slug: "party", image: "/party.png", bg: "#F3EAEA" },
    { id: 4, name: "Gym", slug: "gym", image: "/gym.png", bg: "#DCE0DF" },
  ];
  import { _ } from "svelte-i18n";
</script>

<section class="bg-[#F9F9F9] mt-[50px]">
  <div class="mx-auto px-4 lg:px-10">
    <h1 class="pt-20 mb-10 text-lg sm:text-2xl md:text-4xl font-semibold text-center uppercase">
      {$_("browse_by_style")}
    </h1>
    <div class="grid pb-20 grid-cols-2 gap-5">
      {#each style as item}
        <div
          class="relative rounded-xl overflow-hidden h-28 sm:h-52 md:h-72 lg:h-[450px]"
          style="background-color: {item.bg}"
        >
          <a href={`/category/${item?.slug}`}>
            <img
              src={item?.image}
              alt={item?.name}
              class="w-full h-full transform transition-transform duration-300 hover:scale-110 object-cover sm:object-cover lg:object-cover xl:object-contain"
            />
            <h2
              class="absolute top-8 left-8 text-black text-lg sm:text-2xl md:text-4xl font-semibold"
            >
              {$_(item?.slug)}
            </h2></a
          >
        </div>
      {/each}
    </div>
  </div>
</section>
