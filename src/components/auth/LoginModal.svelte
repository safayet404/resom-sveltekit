<script>
    import { user } from "../../stores/auth";
    import { login } from "$lib/saleor/auth";

    export let isOpen = false;
    export let close = () => {};

    let email = "";
    let password = "";
    let error = "";

    $: canLogin = email.trim() && password.trim();
    $: isOpen; // ensure Svelte tracks the prop

    async function handleLogin() {
        if (!canLogin) return;

        try {
            const result = await login(email, password);

            if (result?.data?.token) {
                user.set({ email, token: result.data.token });
                error = "";
                email = "";
                password = "";
                close();
            } else {
                error = result?.error?.message || "Invalid credentials";
            }
        } catch (err) {
            error = "Login failed. Please try again.";
            console.error(err);
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button class="absolute top-2 right-3 text-red-500" on:click={close}
                >✕</button
            >

            <h2 class="text-xl font-semibold mb-2">
                Are you an existing user?
            </h2>

            <div class="flex justify-between">
                <p class="text-gray-600 mb-4">Please log in first</p>
                <a
                    href="/registration"
                    on:click={close}
                    class="font-semibold my-auto text-sm">Registration</a
                >
            </div>

            <input
                type="text"
                placeholder="Email"
                class="border border-gray-300 w-full p-2 outline-none rounded mb-4"
                bind:value={email}
            />

            <input
                type="password"
                placeholder="Password"
                class="border border-gray-300 w-full p-2 outline-none rounded mb-4"
                bind:value={password}
            />

            {#if error}
                <p class="text-red-500 text-sm mb-2">{error}</p>
            {/if}

            <button
                on:click={handleLogin}
                class={`w-full ${canLogin ? "bg-black" : "bg-gray-500"} text-white font-semibold p-2 rounded`}
                disabled={!canLogin}
            >
                Continue
            </button>

            <p class="text-sm text-center mt-4 text-gray-500">
                By continuing, I agree to their
                <a href="/" class="underline">privacy</a> and
                <a href="/" class="underline">policy</a>
            </p>
        </div>
    </div>
{/if}
