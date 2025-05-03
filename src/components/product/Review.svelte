<script>
    import Rating from "../common/Rating.svelte";

    const ratings = [
        { stars: 5, count: 195 },
        { stars: 4, count: 96 },
        { stars: 3, count: 48 },
        { stars: 2, count: 31 },
        { stars: 1, count: 0 },
    ];

    const maxCount = Math.max(...ratings.map((r) => r.count));
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
    <div class="flex flex-col justify-center mx-auto text-center mt-10">
        <h1 class="text-3xl text-gray-600">
            <span class="font-bold text-4xl text-black">4.7</span> /5
        </h1>

        <div class="mx-auto mt-2">
            <Rating rate={4} />
        </div>
        <p class="text-gray-500">370 Reviews</p>

        <button
            class="px-5 py-1 mt-2 font-medium border rounded-md bg-black text-white"
            >Write Review</button
        >
    </div>

    <div class="space-y-3 mt-6">
        {#each ratings as { stars, count }}
            <div class="flex items-center space-x-3">
                <span class="text-sm w-12"
                    >{stars} Star{stars > 1 ? "s" : ""}</span
                >

                <div
                    class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"
                >
                    <div
                        class="h-full bg-black transition-all duration-300"
                        style="width: {maxCount
                            ? (count / maxCount) * 100
                            : 0}%"
                    ></div>
                </div>

                <span class="text-sm w-8 text-right">{count}</span>
            </div>
        {/each}
    </div>
    <div class="mt-10">
        <h1 class="text-4xl font-bold mx-auto text-center">95%</h1>
        <p class="text-black text-center text-sm">
            of our customers come back for more
        </p>
        <p class="text-gray-600 text-center text-sm">
            Praised for its perfect blend of style,comfort and quality
        </p>
    </div>
</div>
