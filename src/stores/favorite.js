import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialFavorite = browser && localStorage.getItem('favorite')
    ? JSON.parse(localStorage.getItem('favorite'))
    : [];

export const favorite = writable(initialFavorite);

if (browser) {
    favorite.subscribe((value) => {
        localStorage.setItem('favorite', JSON.stringify(value));
    });
}
