import { createSaleorAuthClient } from "@saleor/auth-sdk";

export const saleorApiUrl = "https://api-beta.resom.com.br/graphql/";
export const defaultChannel = "channel-pln"; // adjust if needed

const authClient = createSaleorAuthClient({
    saleorApiUrl,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export const saleorAuthClient = authClient;

export function getAuthToken() {
    return authClient?.authState?.token || null;
}

export async function login(email, password) {
    return await authClient.signIn({ email, password });
}

export async function logout() {
    return await authClient.signOut();
}

export async function register(email, password) {
    const response = await fetch(saleorApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        mutation Register($email: String!, $password: String!, $redirectUrl: String!, $channel: String!) {
          accountRegister(input: {
            email: $email,
            password: $password,
            redirectUrl: $redirectUrl,
            channel: $channel
          }) {
            errors {
              field
              message
              code
            }
            user {
              id
              email
            }
          }
        }
      `,
            variables: {
                email,
                password,
                redirectUrl: "https://localhost:5173/confirm-email", // 👈 update for prod
                channel: defaultChannel,
            },
        }),
    });

    const json = await response.json();
    return {
        data: json?.data?.accountRegister,
        error: json?.errors?.[0] || json?.data?.accountRegister?.errors?.[0],
    };
}
