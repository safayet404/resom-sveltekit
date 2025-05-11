<script>
    import LoginModal from "../../components/auth/LoginModal.svelte";

    let isLoginOpen = false;
</script>

<section class="container mx-auto p-4">
    <div>
        <img
            src="/login.gif"
            alt="login"
            class="w-48 mx-auto mt-20 h-48 object-contain"
        />

        <div class="flex justify-center mt-10">
            <button
                on:click={(isLoginOpen = true)}
                class="mx-auto text-white bg-black px-4 py-2 rounded-lg font-semibold text-center inline-block"
                >You are not logged in.Login first</button
            >
        </div>
    </div>
</section>
<LoginModal isOpen={isLoginOpen} close={() => (isLoginOpen = false)} />
