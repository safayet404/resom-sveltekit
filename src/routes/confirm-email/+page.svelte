<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { saleorApiUrl } from "$lib/saleor/auth";

    let status = "🔄 Confirming your email...";

    onMount(async () => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("token");
        const email = url.searchParams.get("email");

        if (!token || !email) {
            status = "❌ Invalid confirmation link.";
            return;
        }

        try {
            const res = await fetch(saleorApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        mutation ConfirmAccount($email: String!, $token: String!) {
                            confirmAccount(email: $email, token: $token) {
                                errors {
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: { email, token },
                }),
            });

            const json = await res.json();
            console.log("ConfirmAccount response:", json);

            const errors = json?.data?.confirmAccount?.errors;

            if (errors && errors.length > 0) {
                status = "❌ Confirmation failed: " + errors[0].message;
            } else {
                status = "✅ Your email has been successfully confirmed!";
                // setTimeout(() => {
                //     history.replaceState({}, document.title, "/confirm-email");
                //     // Optionally redirect to login:
                //     // goto("/login");
                // }, 1500);

                setTimeout(() => {
                    goto("/login");
                }, 1500);
            }
        } catch (err) {
            console.error("Confirmation error:", err);
            status = "❌ An unexpected error occurred.";
        }
    });
</script>

<svelte:head>
    <title>Email Confirmation</title>
    <meta name="description" content="Email Confirmation" />
</svelte:head>

<section class="container mx-auto p-4 text-center mt-20">
    <div class="mt-10">
        <h1 class="text-2xl font-bold mb-4">Email Confirmation</h1>
        <p class="text-lg">{status}</p>
    </div>
</section>
