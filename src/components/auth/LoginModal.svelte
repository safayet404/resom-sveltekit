<script>
    import { user } from "../../stores/auth";

    import { goto } from "$app/navigation";
    import { blur, fly, scale, slide } from "svelte/transition";
    import Icon from "@iconify/svelte";
    import toast from "svelte-french-toast";

    export let isOpen = false;
    export let close = () => {};

    let email = "";
    let password = "";
    let error = "";
    let loading = false;

    $: canLogin = email.trim() && password.trim();

    async function handleLogin() {
        if (!canLogin) return;
        loading = true;

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                user.set({ email });
                toast.success("Log in Successfully!");
                close();
                goto("/");
            } else {
                error = result.error || "Invalid credentials";
            }
        } catch (err) {
            error = "Login failed. Please try again.";
        }

        loading = false;
    }
</script>

{#if isOpen}
    <div
        transition:scale
        class="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 bg-blur flex justify-center items-center z-50"
    >
        <div class="bg-white p-6 rounded-xl w-full max-w-sm relative">
            <button class="absolute top-2 right-3 text-red-500" on:click={close}
                >✕</button
            >
            <h2 class="text-xl font-semibold mb-1">
                Are you an existing user?
            </h2>
            <div class="flex justify-between items-center mb-4">
                <p class="text-sm text-gray-600">Please log in first</p>
                <a
                    href="/registration"
                    class="text-sm text-blue-600"
                    on:click={close}>Registration</a
                >
            </div>

            <input
                bind:value={email}
                placeholder="Email"
                class="w-full p-2 mb-3 border rounded bg-yellow-100"
            />
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                class="w-full p-2 mb-3 border rounded bg-yellow-100"
            />

            {#if error}
                <p class="text-sm text-red-600 mb-2">{error}</p>
            {/if}

            <button
                on:click={handleLogin}
                disabled={!canLogin}
                class="w-full bg-black text-white p-2 rounded"
            >
                {#if loading}
                    <span class="flex justify-center text-4xl text-white">
                        <Icon icon="codex:loader" />
                    </span>
                {:else}
                    Continue
                {/if}
            </button>

            <p class="text-xs text-center mt-3 text-gray-400">
                By continuing, I agree to their <a class="underline" href="/"
                    >privacy</a
                >
                and <a class="underline" href="/">policy</a>
            </p>
        </div>
    </div>
{/if}
