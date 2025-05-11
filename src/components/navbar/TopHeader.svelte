<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";

    const options = {
        type: "loop",
        autoplay: true,
        interval: 2000,
        pagination: false,
        arrows: false,
        perPage: 1,
    };
</script>

<div class="mx-auto text-center md:text-base text-xs sm:text-sm">
    <Splide {options}>
        <SplideSlide>
            <h1>Enjoy Up to 30% Off at Urban Sailor</h1>
        </SplideSlide>
        <SplideSlide>
            <h1>Off Disocunt</h1>
        </SplideSlide>
    </Splide>
</div>
