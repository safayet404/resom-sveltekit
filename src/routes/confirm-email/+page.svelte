<script>
    import { onMount } from "svelte";

    let status = "Confirming your email...";

    onMount(async () => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("emailToken");

        if (!token) {
            status = "Invalid confirmation link.";
            return;
        }

        const res = await fetch("https://api-beta.resom.com.br/graphql/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
          mutation ConfirmAccount($token: String!) {
            confirmAccount(token: $token) {
              errors {
                field
                message
              }
            }
          }
        `,
                variables: { token },
            }),
        });

        const json = await res.json();
        const errors = json?.data?.confirmAccount?.errors;

        if (errors && errors.length > 0) {
            status = "Confirmation failed: " + errors[0].message;
        } else {
            status = "✅ Your email has been successfully confirmed!";
        }
    });
</script>

<h1 class="text-xl font-bold mb-4">Email Confirmation</h1>
<p>{status}</p>
