import { writable } from "svelte/store";
import { browser } from "$app/environment";

const storedUser = browser ? localStorage.getItem("user") : null;

export const user = writable(storedUser ? JSON.parse(storedUser) : null);

if (browser) {
  user.subscribe((value) => {
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  });
}
