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
                <img
                    class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]"
                    alt="banner"
                    src="/banner4.png"
                />
            </SplideSlide>
            <SplideSlide>
                <img
                    class="w-full mt-10 h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]"
                    alt="banner"
                    src="/banner4.png"
                />
            </SplideSlide>
        </Splide>
    </dvi>
</div>
