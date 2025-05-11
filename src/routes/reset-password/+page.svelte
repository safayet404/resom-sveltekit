<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let token = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let successMessage = "";
    let errorMessage = "";

    onMount(() => {
        const url = $page.url;
        token = url.searchParams.get("token") || "";
        email = url.searchParams.get("email") || "";

        if (!token || !email) {
            errorMessage = "Invalid or expired reset link.";
        }
    });

    async function handlePasswordReset() {
        errorMessage = "";
        successMessage = "";

        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match.";
            return;
        }

        const res = await fetch("https://api-beta.resom.com.br/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
          mutation SetPassword($email: String!, $password: String!, $token: String!) {
            setPassword(email: $email, password: $password, token: $token) {
              token
              refreshToken
              errors {
                field
                message
              }
            }
          }
        `,
                variables: { email, password, token },
            }),
        });

        const json = await res.json();
        const errors = json?.data?.setPassword?.errors;

        if (errors?.length) {
            errorMessage = errors[0].message;
        } else {
            successMessage = "✅ Password reset successfully! Redirecting...";

            setTimeout(() => goto("/login"), 2500);
        }
    }
</script>

<svelte:head>
    <title>Reset Password</title>
    <meta name="description" content="Reset Password" />
</svelte:head>
<section class="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>

    {#if errorMessage}
        <p class="text-red-600 mb-4">{errorMessage}</p>
    {/if}

    {#if !errorMessage}
        <input
            type="password"
            bind:value={password}
            placeholder="New Password"
            class="w-full mb-4 p-2 border rounded"
        />
        <input
            type="password"
            bind:value={confirmPassword}
            placeholder="Confirm Password"
            class="w-full mb-4 p-2 border rounded"
        />

        <button
            class="w-full bg-black text-white py-2 rounded"
            on:click={handlePasswordReset}
        >
            Reset Password
        </button>
    {/if}

    {#if successMessage}
        <p class="text-green-600 mt-4">{successMessage}</p>
    {/if}
</section>
