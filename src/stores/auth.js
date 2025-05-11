import { writable } from "svelte/store";

// function persistentWritable(key, initialValue) {
//     const store = writable(initialValue);

//     if (typeof localStorage !== "undefined") {
//         const json = localStorage.getItem(key);
//         if (json) store.set(JSON.parse(json));

//         store.subscribe((value) => {
//             localStorage.setItem(key, JSON.stringify(value));
//         });
//     }

//     return store;
// }

export const user = writable(null);


export async function logout() {
    user.set(null);
    await fetch('/api/logout', { method: 'POST' });

    window.location.href = '/login';
}