<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    const options = {
        type: "loop",
        autoplay: true,
        interval: 2000,

        arrows: false,
        perPage: 1,
    };
</script>

<div class="mx-auto">
    <dvi>
        <Splide {options}>
            <SplideSlide>
                <enhanced:img
                    class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]"
                    alt="banner"
                    src="$lib/images/banner4.png"
                    loading="lazy"
                />
            </SplideSlide>
            <SplideSlide>
                <enhanced:img
                    class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]"
                    alt="banner"
                    src="$lib/images/banner4.png"
                    loading="lazy"
                />
            </SplideSlide>
        </Splide>
    </dvi>
</div>
