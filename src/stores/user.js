// stores/user.js
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let savedUser = null;

if (browser) {
    const local = localStorage.getItem('user');
    if (local) {
        savedUser = JSON.parse(local);
    }
}

export const user = writable(savedUser);

if (browser) {
    user.subscribe((val) => {
        if (val) {
            localStorage.setItem('user', JSON.stringify(val));
        } else {
            localStorage.removeItem('user');
        }
    });
}
