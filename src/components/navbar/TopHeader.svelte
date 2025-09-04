<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";

  const options = {
    type: "loop",
    autoplay: true,
    interval: 5000,
    pagination: false,
    arrows: true,
    perPage: 1,
    speed: 1000,
  };
</script>

<div class="my-black-bg h-10 flex flex-col items-center justify-center">
  <div class="mx-auto text-center text-xs sm:text-sm sm:w-[550px]">
    <Splide {options}>
      <SplideSlide>
        <h1 class="text-white text-sm">Enjoy Up to 30% Off at Men's Products</h1>
      </SplideSlide>
      <SplideSlide>
        <h1 class="text-white text-sm">Enjoy Up to 40% Off at Kid's Products</h1>
      </SplideSlide>
    </Splide>
  </div>
</div>

<style>
</style>
