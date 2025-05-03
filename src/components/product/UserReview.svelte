<script>
    import Icon from "@iconify/svelte";
</script>

<section class="container mx-auto p-4">
    <div class="flex justify-between border-b pb-3">
        <h1 class="font-semibold">Reviewed by 370 Customers</h1>
        <p>Most Recent</p>
    </div>
    <div class="mt-5">
        <div class="flex flex-wrap justify-between">
            <h1 class="font-semibold">5 star Reviewed by Sarah W.</h1>
            <p class="text-sm text-gray-600">12 December 2024</p>
        </div>

        <div>
            <p class="text-gray-500 text-xs md:text-sm mb-3 mt-5">
                I absolutely love this dress.This fabrics feels amazing,and the
                fit is just perfect.Highly recommende it !
            </p>

            <div class="flex flex-wrap justify-between">
                <div class="flex gap-2">
                    <img src="/review.png" class="w-20 h-20" alt="product" />
                    <img src="/review.png" class="w-20 h-20" alt="product" />
                    <img src="/review.png" class="w-20 h-20" alt="product" />
                </div>

                <div class="flex gap-2 items-end">
                    <p class="text-sm text-gray-500">Was this helpful?</p>
                    <Icon icon="solar:like-broken"></Icon>
                    <Icon icon="solar:dislike-broken"></Icon>
                </div>
            </div>
        </div>
    </div>
</section>
