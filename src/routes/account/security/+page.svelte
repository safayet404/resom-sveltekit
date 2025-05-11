<script>
    import { saleorApiUrl } from "$lib/saleor/auth";
    import { PUBLIC_CHANNEL, PUBLIC_REDIRECT_URL } from "$env/static/public";

    let email = "";
    let resetMessage = "";
    let errorMessage = "";

    let option = "";

    async function handleRequestResetLink() {
        resetMessage = "";
        errorMessage = "";

        const res = await fetch(saleorApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
					mutation RequestPasswordReset($email: String!, $redirectUrl: String!, $channel: String!) {
						requestPasswordReset(email: $email, redirectUrl: $redirectUrl, channel: $channel) {
							errors {
								field
								message
							}
						}
					}
				`,
                variables: {
                    email,
                    redirectUrl: `${PUBLIC_REDIRECT_URL}reset-password`,
                    channel: PUBLIC_CHANNEL,
                },
            }),
        });

        const json = await res.json();
        console.log("Reset request response:", json);

        const errors = json?.data?.requestPasswordReset?.errors;
        if (errors?.length) {
            errorMessage = errors[0].message;
        } else {
            resetMessage = "✅ Password reset link sent to your email.";
        }
    }

    export let data;
    console.log("Logged in user:", data.user);
</script>

<section class="container mx-auto p-4 bg-white rounded-lg">
    <div class="p-5">
        {#if option === "reset"}
            <!-- Request password reset link -->
            <div>
                <label for="email">Enter your email to get reset link</label>
                <input
                    bind:value={email}
                    placeholder="Your email"
                    class="w-full p-2 mt-2 rounded-md border border-black bg-[#F0F0F0]"
                />

                <button
                    class="mt-5 px-4 py-2 bg-black text-white rounded"
                    on:click={handleRequestResetLink}
                >
                    Send Reset Link
                </button>

                {#if resetMessage}
                    <p class="text-green-600 mt-2">{resetMessage}</p>
                {/if}
                {#if errorMessage}
                    <p class="text-red-600 mt-2">{errorMessage}</p>
                {/if}

                <div class="mt-5">
                    <button on:click={() => (option = "")} class="underline"
                        >Back</button
                    >
                </div>
            </div>
        {:else}
            <div>
                <h1 class="mb-4">Password</h1>
                <p class="mb-3">*******</p>
                <p class="text-red-600 font-medium">
                    <span
                        class="px-3 py-1 font-bold rounded-full border border-red-600"
                        >!</span
                    >
                    You already have a password. Do you want to
                    <button
                        on:click={() => (option = "reset")}
                        class="underline">reset</button
                    >
                    it or
                    <button
                        on:click={() => (option = "forgot")}
                        class="underline">forgot</button
                    >
                    it?
                </p>
            </div>
        {/if}
    </div>
</section>
