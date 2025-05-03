import { writable } from "svelte/store";
import { getAuthToken } from "$lib/saleor/auth";

export const authToken = writable(null);
export const user = writable(null);

export async function initAuth() {
    const token = getAuthToken();
    authToken.set(token);

    if (token) {
        user.set({ token }); // You can enhance this to fetch user details
    } else {
        user.set(null);
    }
}
