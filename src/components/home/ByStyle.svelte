<script>
    const style = [
        { id: 1, name: "Casual", image: "/casual.png" },
        { id: 2, name: "Formal", image: "/formal.png" },
        { id: 3, name: "Party", image: "/party.png" },
        { id: 4, name: "Gym", image: "/gym.png" },
    ];
</script>

<section class="bg-[#F2F2F2] mt-10">
    <div class="container mx-auto px-4">
        <h1 class="pt-10 mb-10 text-4xl font-bold text-center uppercase">
            Browse By Style
        </h1>
        <div class="grid grid-cols-12 gap-5">
            {#each Array(Math.ceil(style.length / 2)) as _, i}
                {#if i % 2 === 0}
                    <!-- Even rows: 4 + 8 -->
                    <div class="col-span-5 border rounded-xl shadow-md">
                        <div
                            class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"
                        >
                            <img
                                src={style[i * 2]?.image}
                                alt={style[i * 2]?.name}
                                class="w-full h-full object-cover"
                            />
                            <h2
                                class="absolute top-4 left-4 text-black text-lg font-semibold"
                            >
                                {style[i * 2]?.name}
                            </h2>
                        </div>
                    </div>
                    <div class="col-span-7 border rounded-xl shadow-md">
                        <div
                            class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"
                        >
                            <img
                                src={style[i * 2 + 1]?.image}
                                alt={style[i * 2 + 1]?.name}
                                class="w-full h-full object-cover"
                            />
                            <h2
                                class="absolute top-4 left-4 text-black text-lg font-semibold"
                            >
                                {style[i * 2 + 1]?.name}
                            </h2>
                        </div>
                    </div>
                {:else}
                    <!-- Odd rows: 8 + 4 -->
                    <div class=" mb-10 col-span-7 border rounded-xl shadow-md">
                        <div
                            class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"
                        >
                            <img
                                src={style[i * 2]?.image}
                                alt={style[i * 2]?.name}
                                class="w-full h-full object-cover"
                            />
                            <h2
                                class="absolute top-4 left-4 text-black text-lg font-semibold"
                            >
                                {style[i * 2]?.name}
                            </h2>
                        </div>
                    </div>
                    <div class=" mb-10 col-span-5 border rounded-xl shadow-md">
                        <div
                            class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"
                        >
                            <img
                                src={style[i * 2 + 1]?.image}
                                alt={style[i * 2 + 1]?.name}
                                class="w-full h-full object-cover"
                            />
                            <h2
                                class="absolute top-4 left-4 text-black text-lg font-semibold"
                            >
                                {style[i * 2 + 1]?.name}
                            </h2>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</section>
