import { browser } from "$app/environment";
import { writable } from "svelte/store";

function loadCart() {
  if (!browser) return [];

  try {
    const stored = localStorage.getItem("cart");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : []; // ensure it's always an array
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
}

export const cart = writable(loadCart());

if (browser) {
  cart.subscribe((value) => {
    localStorage.setItem("cart", JSON.stringify(value));
  });
}
