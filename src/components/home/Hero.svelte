<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  const options = {
    type: "loop",
    autoplay: true,
    interval: 5000,
    speed: 1000,
    arrows: false,
    perPage: 1,
  };
</script>

<!-- mt-10  -->
<div class="mx-auto">
  <div>
    <Splide {options}>
      <SplideSlide>
        <img
          class="w-full h-[25vh] sm:h-[30vh] md:h-[45vh] lg:h-[52vh] xl:h-[72vh] object-fill"
          alt="banner"
          src="/banner1.png"
          loading="lazy"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="w-full h-[25vh] sm:h-[30vh] md:h-[45vh] lg:h-[52vh] xl:h-[72vh] object-fill"
          alt="banner"
          src="/banner2.png"
          loading="lazy"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          class="w-full h-[25vh] sm:h-[30vh] md:h-[45vh] lg:h-[52vh] xl:h-[72vh] object-fill"
          alt="banner"
          src="/banner3.png"
          loading="lazy"
        />
      </SplideSlide>
    </Splide>
  </div>
</div>
