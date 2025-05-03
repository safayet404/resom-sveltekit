import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialCart = browser && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

export const cart = writable(initialCart);

if (browser) {
    cart.subscribe((value) => {
        localStorage.setItem('cart', JSON.stringify(value));
    });
}
